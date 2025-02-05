import axios from 'axios';

const BASE_URL = 'http://orbit-app.net:8090/api/auth/TodoList';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000
});

// 오프라인 저장소 관리
const OfflineStorage = {
  getOfflineTodos() {
    return JSON.parse(localStorage.getItem('offlineTodos') || '[]');
  },

  saveOfflineTodos(todos) {
    localStorage.setItem('offlineTodos', JSON.stringify(todos));
  },

  addOfflineTodo(todo) {
    const todos = this.getOfflineTodos();
    const newTodo = { ...todo, id: `offline_${Date.now()}`, offline: true };
    todos.push(newTodo);
    this.saveOfflineTodos(todos);
    return newTodo;
  },

  removeOfflineTodo(todoId) {
    const todos = this.getOfflineTodos();
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    this.saveOfflineTodos(filteredTodos);
  },

  updateOfflineTodo(todoId, todoData) {
    const todos = this.getOfflineTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === todoId ? { ...todo, ...todoData } : todo
    );
    this.saveOfflineTodos(updatedTodos);
    return updatedTodos.find(todo => todo.id === todoId);
  },

  clearOfflineTodos() {
    localStorage.removeItem('offlineTodos');
  }
};

// 네트워크 상태 확인
const checkOnlineStatus = async () => {
  try {
    await apiClient.get('/');  // Base URL로 ping
    return true;
  } catch (error) {
    return false;
  }
};

// 오프라인 데이터 동기화
const syncOfflineTodos = async () => {
  const offlineTodos = OfflineStorage.getOfflineTodos();
  if (!offlineTodos.length) return;

  const isOnline = await checkOnlineStatus();
  if (!isOnline) return;

  for (const todo of offlineTodos) {
    try {
      const { id, offline, ...todoData } = todo;
      await TodoAPI.createTodo(todoData);
    } catch (error) {
      console.error('동기화 중 오류 발생:', error);
    }
  }

  OfflineStorage.clearOfflineTodos();
};

// 에러 처리
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (!error.response) {
    throw new Error('서버에 연결할 수 없습니다. 데이터를 임시 저장합니다.');
  }
  throw new Error(error.response?.data?.data || '서버 오류가 발생했습니다.');
};

// Todo API
export const TodoAPI = {
  async fetchAllTodos(memberId) {
    if (!navigator.onLine) {
      return OfflineStorage.getOfflineTodos();
    }

    try {
      const response = await apiClient.get(`/?memberId=${memberId}`);
      if (response.data.successResult) {
        const serverTodos = response.data.data;
        const offlineTodos = OfflineStorage.getOfflineTodos();
        return [...serverTodos, ...offlineTodos];
      }
      throw new Error(response.data.data);
    } catch (error) {
      if (!error.response) {
        return OfflineStorage.getOfflineTodos();
      }
      handleApiError(error);
    }
  },

  async createTodo(todoData) {
    try {
      const response = await apiClient.post('/', {
        memberId: todoData.memberId,
        mainTask: todoData.mainTask,
        subTaskList: todoData.subTaskList.map(sub => ({
          task: sub.task,
          details: sub.details || "",
          tags: sub.tags || [],
          onChecked: sub.onChecked
        })),
        date: todoData.date
      });

      if (response.data.successResult) {
        await syncOfflineTodos();
        return response.data;
      }
      throw new Error(response.data.data);
    } catch (error) {
      if (!error.response) {
        return OfflineStorage.addOfflineTodo(todoData);
      }
      handleApiError(error);
    }
  },

  async updateTodo(todoId, todoData) {
    try {
      if (todoId.startsWith('offline_')) {
        return OfflineStorage.updateOfflineTodo(todoId, todoData);
      }
      
      const response = await apiClient.put('/', {
        memberId: todoData.memberId,
        mainTask: todoData.mainTask,
        subTaskList: todoData.subTaskList,
        date: todoData.date
      });

      if (response.data.successResult) {
        return response.data;
      }
      throw new Error(response.data.data);
    } catch (error) {
      if (!error.response) {
        return OfflineStorage.updateOfflineTodo(todoId, todoData);
      }
      handleApiError(error);
    }
  },

  async deleteTodo(todoId, memberId) {
    try {
      if (todoId.startsWith('offline_')) {
        OfflineStorage.removeOfflineTodo(todoId);
        return;
      }
      
      const response = await apiClient.delete(`/?todoId=${todoId}&memberId=${memberId}`);
      if (!response.data.successResult) {
        throw new Error(response.data.data);
      }
    } catch (error) {
      handleApiError(error);
    }
  }
};