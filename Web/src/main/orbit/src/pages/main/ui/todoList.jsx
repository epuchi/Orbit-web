import React from "react";
import styles from "./todoList.module.css";
import {useMainModel} from "../model"; // 모델 import
import {useNavigate} from "react-router-dom";

// 투두 리스트 컴포넌트
const TodoList = () => {
    const navigate = useNavigate();

    // 모델에서 투두 리스트 가져오기
    const {toDoListInfo} = useMainModel();
    const toDoList = toDoListInfo();

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

            {/* 투두 리스트 본문 */}
            <div className={styles.todoItems}>
                {toDoList.length > 0 ? (
                    toDoList.map((item, index) => (
                        <div key={index} className={styles.todoItem}>
                            {/* 체크박스 */}
                            <input
                                type="checkbox"
                                checked={item.onCheck === 1}
                                readOnly
                            />
                            {/* 투두 항목 텍스트 */}
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
            </div>
        </div>
    );
};

export default TodoList;
