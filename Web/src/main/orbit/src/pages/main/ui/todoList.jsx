import React from "react";
import styles from "./todoList.module.css";
import { useMainModel } from "../model"; // 모델 import
import { useNavigate } from "react-router-dom";

// 투두 리스트 컴포넌트
const TodoList = () => {
    const navigate = useNavigate();

    // 모델에서 투두 리스트 가져오기
    const { toDoListData } = useMainModel();
    const toDoList = toDoListData();

    // 투두 리스트 페이지로 이동
    const goToTodoList = () => {
        navigate("/todolist");
    };

    return (
        <div className={styles.todoListContainer}>
            {/* 투두 리스트 헤더 */}
            <div className={styles.todoListHeader}>
                <span>Todo List</span>
                <button className={styles.navigateButton} onClick={goToTodoList}>
                    <a>
                        &gt;
                    </a>
                </button>
            </div>

            {/* 투두 리스트 본문
            <div className={styles.todoItems}>
                {toDoList.length > 0 ? (
                    toDoList.map((item, index) => (
                        <div key={index} className={styles.todoItem}>
                            <input
                                type="checkbox"
                                checked={item.onCheck === 1}
                                readOnly
                            />
                            <div className={styles.todoText}>
                                <span className={styles.todoTitle}>
                                    {item.title}
                                </span>
                                <p className={styles.todoDescription}>
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    // 투두 리스트가 없는 경우
                    <span className={styles.noTodoMessage}>
                        오늘의 할 일이 없습니다!
                        할 일들을 추가 해보세요!
                    </span>
                )}
            </div> */}

<div className={styles.toDo}>
    {toDoList.length > 0 ? (
        toDoList.map((item, index) => (
            <div key={item.id || index} className={`${styles.toDoList} border-box`}>
                <input type="checkbox" name="" id="" />
                <div className={`${styles.mainTask} border-box`}>
                    <p className={styles.mainTaskTitle}>{item.mainTask}</p>
                    <p>{item.details} {item.date}</p>
                    {item.tag.length > 0 &&
                        item.tag.map((tag, tagIndex) => (
                            <p key={tagIndex}>{tag}</p>
                        ))}
                </div>
                {item.subTaskList.length > 0 &&
                    item.subTaskList.map((task, taskIndex) => (
                        <div key={taskIndex} className={styles.subTask}>
                            <input
                                className={styles.subTaskCheck}
                                type="checkbox"
                                id={`subTask-${index}-${taskIndex}`}
                            />
                            <label
                                className={styles.subTaskText}
                                htmlFor={`subTask-${index}-${taskIndex}`}
                            >
                                {task}
                            </label>
                        </div>
                    ))}
            </div>
        ))
    ) : (
        <span className={styles.noTodoMessage}>
            오늘의 할 일이 없습니다! 할 일들을 추가 해보세요!
        </span>
    )}
</div>

        </div>
    );
};

export default TodoList;
