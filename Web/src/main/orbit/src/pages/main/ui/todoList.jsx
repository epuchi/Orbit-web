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

            <div className={styles.toDo}>
                {toDoList.length > 0 ? (
                    toDoList.map((item, index) => (
                        <div key={index}>
                            <div className={`${styles.mainTask} border-box`}>
                                <p className={styles.mainTaskTitle}>{item.mainTask}</p>
                                <p>{item.date}</p>
                                {item.subTaskList.length > 0 ? (
                                    item.subTaskList.map((subitem, subindex) => (
                                        <div key={subindex}>
                                            <input type="checkbox" checked={subitem.onChecked} />
                                            <p>{subitem.details}</p>
                                            {subitem.tags.length > 0 ? (
                                                subitem.tags.map((tagitem, tagindex) => (
                                                    <div key={tagindex}>
                                                        <div className="">
                                                            <p>{tagitem}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className=""></div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={styles.noTodoMessage}>
                        오늘의 할 일이 없습니다! 할 일들을 추가 해보세요!
                    </span>
                )}
            </div>

        </div >
    );
};

export default TodoList;
