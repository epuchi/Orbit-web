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
    const newTodo = { ...todo, offline: true };
    todos.push(newTodo);
    this.saveOfflineTodos(todos);
    return newTodo;
  },

  removeOfflineTodo(index) {
    const todos = this.getOfflineTodos();
    todos.splice(index, 1);
    this.saveOfflineTodos(todos);
  },

  updateOfflineTodo(index, todoData) {
    const todos = this.getOfflineTodos();
    todos[index] = { ...todos[index], ...todoData };
    this.saveOfflineTodos(todos);
    return todos[index];
  },

  clearOfflineTodos() {
    localStorage.removeItem('offlineTodos');
  }
};

// 네트워크 상태 확인
const checkOnlineStatus = async () => {
  try {
    const requestBody = {
      successCode: 200,
      successResult: true,
      mainTask: "",
      subTaskList: [],
      date: new Date().toISOString().split('T')[0]
    };
    await apiClient.post('', requestBody);
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
      const { offline, ...todoData } = todo;
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
  if (error.response?.data?.failCode === '401') {
    throw new Error(error.response.data.data || '인증 오류가 발생했습니다.');
  }
  throw new Error(error.response?.data?.data || '서버 오류가 발생했습니다.');
};

// Todo API
export const TodoAPI = {
  async fetchAllTodos() {
    if (!navigator.onLine) {
      return OfflineStorage.getOfflineTodos();
    }

    try {
      const requestBody = {
        successCode: 200,
        successResult: true,
        mainTask: "",
        subTaskList: [],
        date: new Date().toISOString().split('T')[0]
      };

      const response = await apiClient.post('', requestBody);
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
      // 데이터 유효성 검사
      if (!todoData.mainTask || !todoData.date || !Array.isArray(todoData.subTaskList)) {
        throw new Error('필수 데이터가 누락되었습니다.');
      }

      const requestBody = {
        successCode: 200,
        successResult: true,
        mainTask: todoData.mainTask,
        subTaskList: todoData.subTaskList.map(sub => ({
          task: sub.task,
          details: sub.details || "",
          tags: Array.isArray(sub.tags) ? sub.tags : [],
          onChecked: typeof sub.onChecked === 'number' ? sub.onChecked : 0
        })),
        date: todoData.date
      };

      const response = await apiClient.post('', requestBody);

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

  async updateTodo(index, todoData) {
    try {
      if (typeof index !== 'number') {
        throw new Error('유효한 인덱스가 필요합니다.');
      }

      const requestBody = {
        successCode: 200,
        successResult: true,
        mainTask: todoData.mainTask,
        subTaskList: todoData.subTaskList.map(sub => ({
          task: sub.task,
          details: sub.details || "",
          tags: Array.isArray(sub.tags) ? sub.tags : [],
          onChecked: typeof sub.onChecked === 'number' ? sub.onChecked : 0
        })),
        date: todoData.date
      };
      
      const response = await apiClient.post('', requestBody);

      if (response.data.successResult) {
        return response.data;
      }
      throw new Error(response.data.data);
    } catch (error) {
      if (!error.response) {
        return OfflineStorage.updateOfflineTodo(index, todoData);
      }
      handleApiError(error);
    }
  },

  async deleteTodo(index, todoData) {
    try {
      if (typeof index !== 'number') {
        throw new Error('유효한 인덱스가 필요합니다.');
      }

      const requestBody = {
        successCode: 200,
        successResult: true,
        mainTask: todoData.mainTask,
        subTaskList: [],
        date: todoData.date
      };

      const response = await apiClient.post('', requestBody);
      if (!response.data.successResult) {
        throw new Error(response.data.data);
      }
    } catch (error) {
      if (!error.response) {
        OfflineStorage.removeOfflineTodo(index);
        return;
      }
      handleApiError(error);
    }
  }
};