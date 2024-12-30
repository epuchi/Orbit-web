import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './reactCalendarOverrides.css';
import styles from './styles.module.css';

const TodoListPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [mainTask, setMainTask] = useState('');
  const [isMainTaskFixed, setIsMainTaskFixed] = useState(false);
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [descriptionFixed, setDescriptionFixed] = useState(false);
  const [todos, setTodos] = useState({});
  const [selectedDateTodos, setSelectedDateTodos] = useState([]);
  const [tags, setTags] = useState([{ id: 1, value: '', isFixed: false }]);
  const [inputFields, setInputFields] = useState({
    description: '',
  });

  // Fetch todos from server on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://34.64.173.72:3000/todos');
        const todosData = response.data.reduce((acc, todo) => {
          const date = todo.date;
          if (!acc[date]) acc[date] = [];
          acc[date].push(todo);
          return acc;
        }, {});
        setTodos(todosData);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTag = () => {
    setTags(prev => [...prev, { id: prev.length + 1, value: '', isFixed: false }]);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !mainTask) {
      alert('날짜와 일정을 입력해주세요!');
      return;
    }

    const newTodo = {
      mainTask,
      additionalTasks: additionalInputs.filter(input => input.isFixed).map(input => input.value),
      description: inputFields.description,
      tags: tags.filter(tag => tag.isFixed).map(tag => tag.value),
      date: selectedDate
    };

    try {
      // Send to backend
      const response = await axios.post('http://34.64.173.72:3000/todos', newTodo);
      const savedTodo = response.data;

      // Update local state
      setTodos(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), savedTodo]
      }));

      // Reset form
      setMainTask('');
      setIsMainTaskFixed(false);
      setAdditionalInputs([]);
      setInputFields({ description: '' });
      setTags([{ id: 1, value: '', isFixed: false }]);
      setDescriptionFixed(false);
    } catch (error) {
      console.error('Failed to save todo:', error);
      alert('일정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (selectedDate && todos[selectedDate]) {
      setSelectedDateTodos(todos[selectedDate]);
    } else {
      setSelectedDateTodos([]);
    }
  }, [selectedDate, todos]);

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
    if (!inputFields.description.trim()) {
      alert('설명을 입력하세요!');
      return;
    }
    setDescriptionFixed(true);
  };

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
    setAdditionalInputs((prev) => [
      ...prev,
      { id: prev.length + 1, value: '', isFixed: false },
    ]);
  };

  const handleAdditionalInputChange = (id, value) => {
    setAdditionalInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handleFixAdditionalInput = (id) => {
    setAdditionalInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, isFixed: true } : input
      )
    );
  };

  // Delete todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://34.64.173.72:3000/todos/${todoId}`);
      setTodos(prev => {
        const newTodos = { ...prev };
        Object.keys(newTodos).forEach(date => {
          newTodos[date] = newTodos[date].filter(todo => todo.id !== todoId);
          if (newTodos[date].length === 0) delete newTodos[date];
        });
        return newTodos;
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('일정 삭제에 실패했습니다.');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.todoContainer}>
        <h1 className={styles.head}>Todo</h1>
        <div className={styles.dateDisplayContainer}>
          <span className={styles.dateDisplay}>{currentDate}</span>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
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
                  placeholder="오늘의 일정을 적어주세요!"
                />
                <button
                  type="button"
                  className={styles.checkButton}
                  onClick={handleFixMainTask}
                >
                  ✔️
                </button>
              </>
            )}
          </div>

          {additionalInputs.map((input) => (
            <div key={input.id} className={styles.smallInputWrapper}>
              {input.isFixed ? (
                <div className={`${styles.smallInputWrapper} ${styles.fixedTask}`}>{input.value}</div>
              ) : (
                <>
                  <input
                    type="text"
                    value={input.value}
                    onChange={(e) =>
                      handleAdditionalInputChange(input.id, e.target.value)
                    }
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

          <label className={styles.inputContainer}>
            {descriptionFixed ? (
              <div className={styles.fixedTask}>{inputFields.description}</div>
            ) : (
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="description"
                  value={inputFields.description}
                  onChange={(e) =>
                    setInputFields((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
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
            <input
              type="text"
              className={styles.inputField}
              value={selectedDate}
              readOnly
              style={{ backgroundColor: selectedDate ? '#f0f0f0' : '#f9f9f9' }}
              placeholder="날짜를 선택하세요"
            />
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
                        onClick={() => {
                          if (tag.value.trim()) {
                            handleFixTag(tag.id);
                          }
                        }}
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
          </label>
        </form>
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
        <div className={styles.todosContainer}>
          {selectedDateTodos.map((todo, index) => (
            <div key={index} className={styles.todoItem}>
              <div className={styles.todoHeader}>
                <h3>{todo.mainTask}</h3>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  🗑️
                </button>
              </div>
              {todo.additionalTasks.length > 0 && (
                <ul className={styles.additionalTasks}>
                  {todo.additionalTasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              )}
              {todo.description && (
                <p className={styles.todoDescription}>{todo.description}</p>
              )}
              {todo.tags.length > 0 && (
                <div className={styles.todoTags}>
                  {todo.tags.map((tag, i) => (
                    <span key={i} className={styles.todoTag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;