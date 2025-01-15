import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { TodoAPI } from '../api';
import { TodoModel } from '../model';
import styles from './styles.module.css';
import 'react-calendar/dist/Calendar.css';
import './reactCalendarOverrides.css';

// Custom Hook: Todo 상태 관리
const useTodoState = () => {
  const [todos, setTodos] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateTodos, setSelectedDateTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  // 할 일 목록 조회
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await TodoAPI.fetchAllTodos();
      const todosData = TodoModel.groupByDate(response);
      setTodos(todosData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 네트 워크 상태 감지
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 할 일 생성
  const createTodo = async (todoData) => {
    const todoModel = new TodoModel(todoData);
    const { isValid, errors } = todoModel.validate();
    
    if (!isValid) {
      throw new Error(Object.values(errors)[0]);
    }

    const savedTodo = await TodoAPI.createTodo(todoModel.toApiFormat());
    setTodos(prev => ({
      ...prev,
      [todoData.date]: [...(prev[todoData.date] || []), savedTodo]
    }));
    return savedTodo;
  };

  // 할 일 삭제
  const deleteTodo = async (todoId) => {
    await TodoAPI.deleteTodo(todoId);
    setTodos(prev => {
      const newTodos = { ...prev };
      Object.keys(newTodos).forEach(date => {
        newTodos[date] = newTodos[date].filter(todo => todo.id !== todoId);
        if (newTodos[date].length === 0) delete newTodos[date];
      });
      return newTodos;
    });
  };

  useEffect(() => {
    if (selectedDate && todos[selectedDate]) {
      setSelectedDateTodos(todos[selectedDate]);
    } else {
      setSelectedDateTodos([]);
    }
  }, [selectedDate, todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    selectedDate,
    selectedDateTodos,
    isLoading,
    error,
    isOffline, 
    setSelectedDate,
    createTodo,
    deleteTodo,
  };
};

// 투두 폼 컴포넌트트
const TodoForm = ({ onSubmit, selectedDate }) => {
  const [mainTask, setMainTask] = useState('');
  const [isMainTaskFixed, setIsMainTaskFixed] = useState(false);
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [descriptionFixed, setDescriptionFixed] = useState(false);
  const [tags, setTags] = useState([{ id: 1, value: '', isFixed: false }]);
  const [inputFields, setInputFields] = useState({
    details: '',
  });

  const handleMainTaskChange = (e) => {
    setMainTask(e.target.value);
  };

  const handleFixMainTask = () => {
    if (!mainTask.trim()) {
      alert('오늘의 일정을 입력하세요!');
      return;
    }
    setIsMainTaskFixed(true);
  };

  const handleAddInput = () => {
    setAdditionalInputs(prev => [
      ...prev,
      { id: prev.length + 1, value: '', isFixed: false }
    ]);
  };

  const handleAdditionalInputChange = (id, value) => {
    setAdditionalInputs(prev =>
      prev.map(input => input.id === id ? { ...input, value } : input)
    );
  };

  const handleFixAdditionalInput = (id) => {
    setAdditionalInputs(prev =>
      prev.map(input => input.id === id ? { ...input, isFixed: true } : input)
    );
  };

  

  const handleAddTag = () => {
    setTags(prev => [...prev, { id: prev.length + 1, value: '', isFixed: false }]);
  };

  const handleTagChange = (id, value) => {
    setTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, value } : tag
    ));
  };

  const handleFixTag = (id) => {
    setTags(prev => prev.map(tag =>
      tag.id === id ? { ...tag, isFixed: true } : tag
    ));
  };

  const handleFixDescription = () => {
    if (!inputFields.details.trim()) {
      alert('설명을 입력하세요!');
      return;
    }
    setDescriptionFixed(true);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !mainTask) {
      alert('날짜와 일정을 입력해주세요!');
      return;
    }

    const todoData = {
      mainTask,
      subTaskList: additionalInputs
        .filter(input => input.isFixed)
        .map(input => input.value),
      details: inputFields.details,
      tags: tags
        .filter(tag => tag.isFixed)
        .map(tag => tag.value),
      date: selectedDate
    };

    try {
      await onSubmit(todoData);
      // 폼 초기화
      setMainTask('');
      setIsMainTaskFixed(false);
      setAdditionalInputs([]);
      setInputFields({ details: '' });
      setTags([{ id: 1, value: '', isFixed: false }]);
      setDescriptionFixed(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.dateSelectionInfo}>
        {selectedDate ? (
          <span className={styles.selectedDate}>
            선택된 날짜: {selectedDate}
          </span>
        ) : (
          <span className={styles.dateSelectPrompt}>
            📅 캘린더에서 날짜를 선택해주세요
          </span>
        )}
      </div>
 
      <div className={styles.inputWrapper}>
        {isMainTaskFixed ? (
          <div className={styles.fixedTask}>{mainTask}</div>
        ) : (
          <>
            <input
              type="text"
              value={mainTask}
              onChange={handleMainTaskChange}
              className={styles.inputField}
              placeholder={selectedDate ? "오늘의 일정을 적어주세요!" : "먼저 날짜를 선택해주세요"}
              disabled={!selectedDate}
            />
            <button
              type="button"
              className={styles.checkButton}
              onClick={handleFixMainTask}
              disabled={!selectedDate}
            >
              ✔️
            </button>
          </>
        )}
      </div>
 
      {additionalInputs.map((input) => (
        <div key={input.id} className={styles.smallInputWrapper}>
          {input.isFixed ? (
            <div className={styles.fixedTask}>{input.value}</div>
          ) : (
            <>
              <input
                type="text"
                value={input.value}
                onChange={(e) => handleAdditionalInputChange(input.id, e.target.value)}
                className={styles.smallInputField}
                placeholder="추가 일정을 입력하세요"
              />
              <button
                type="button"
                className={styles.checkButton}
                onClick={() => handleFixAdditionalInput(input.id)}
              >
                ✔️
              </button>
            </>
          )}
        </div>
      ))}
 
      {isMainTaskFixed && (
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddInput}
        >
          ＋ 추가
        </button>
      )}
 
      <div className={styles.inputContainer}>
        {descriptionFixed ? (
          <div className={styles.fixedTask}>{inputFields.details}</div>
        ) : (
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={inputFields.details}
              onChange={(e) => setInputFields(prev => ({
                ...prev,
                details: e.target.value
              }))}
              className={styles.inputField}
              placeholder="일정의 설명을 적어주세요!"
            />
            <button
              type="button"
              className={styles.checkButton}
              onClick={handleFixDescription}
            >
              ✔️
            </button>
          </div>
        )}
 
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <div key={tag.id} className={styles.tagInputWrapper}>
              {tag.isFixed ? (
                <div className={styles.fixedTag}>#{tag.value}</div>
              ) : (
                <>
                  <input
                    type="text"
                    value={tag.value}
                    onChange={(e) => handleTagChange(tag.id, e.target.value)}
                    className={styles.tagInput}
                    placeholder="원하시는 태그가 있을까요?"
                  />
                  <button
                    type="button"
                    className={styles.checkButton}
                    onClick={() => handleFixTag(tag.id)}
                  >
                    ✔️
                  </button>
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            className={`${styles.addButton} ${styles.tagAddButton}`}
            onClick={handleAddTag}
          >
            ＋ 태그 추가
          </button>
        </div>
 
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </form>
  );
};

// TodoList Component
const TodoList = ({ todos, onDelete }) => {

  const todoList = todos || [];
  return (
    <div className={styles.todosContainer}>
      {todoList.map((todo, index) => (
        <div key={index} className={styles.todoItem}>
          <div className={styles.todoHeader}>
            <h3>{todo.mainTask}</h3>
            <button
              onClick={() => onDelete(todo.id)}
              className={styles.deleteButton}
            >
              🗑️
            </button>
          </div>
          {todo.subTaskList?.length > 0 && (
            <ul className={styles.additionalTasks}>
              {todo.subTaskList.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          )}
          {todo.details && (
            <p className={styles.todoDescription}>{todo.details}</p>
          )}
          {todo.tags?.length > 0 && (
            <div className={styles.todoTags}>
              {todo.tags.map((tag, i) => (
                <span key={i} className={styles.todoTag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Component
const TodoListPage = () => {
  const {
    todos,
    selectedDate,
    selectedDateTodos,
    isLoading,
    error,
    isOffline,
    setSelectedDate,
    createTodo,
    deleteTodo
  } = useTodoState();

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleDateChange = (date) => {
    setCalendarDate(date);
    setSelectedDate(date.toLocaleDateString('ko-KR'));
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      {isOffline && (
        <div className={styles.offlineAlert}>
          오프라인 모드입니다. 데이터가 임시 저장되며, 인터넷 연결 시 자동으로 동기화됩니다.
        </div>
      )}
      <div className={styles.todoContainer}>
        <h1 className={styles.head}>Todo</h1>
        <div className={styles.dateDisplayContainer}>
          <span className={styles.dateDisplay}>{currentDate}</span>
        </div>
        <TodoForm
          onSubmit={createTodo}
          selectedDate={selectedDate}
        />
      </div>
  
      <div className={styles.calendarContainer}>
        <div className={styles.calendarContent}>
          <Calendar
            onChange={handleDateChange}
            value={calendarDate}
            className={styles.reactCalendar}
            formatDay={(locale, date) => date.getDate()}
          />
        </div>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <TodoList
            todos={selectedDateTodos}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  );
};

export default TodoListPage;