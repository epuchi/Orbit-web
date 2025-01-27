import React, { useState, useEffect } from "react";
import styles from "./todoList.module.css";
import { useMainModel } from "../model"; // 모델 import
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const navigate = useNavigate();
    const { toDoListData } = useMainModel();
    const [toDoList, setToDoList] = useState([]); // 초기값은 빈 배열
    const [expandedTasks, setExpandedTasks] = useState({}); // 각 mainTask의 토글 상태

    useEffect(() => {
        const data = toDoListData() || []; // 함수가 null을 반환할 경우 빈 배열로 처리
        setToDoList(data);
    }, [toDoListData]);

    // 체크박스 상태 업데이트
    const handleCheck = (mainIndex, subIndex) => {
        setToDoList((prevList) => {
            const updatedList = [...prevList];
            const subTask = updatedList[mainIndex]?.subTaskList?.[subIndex];
            if (subTask) {
                subTask.onChecked = !subTask.onChecked; // 상태 변경
            }
            return updatedList;
        });
    };

    // 모든 서브태스크가 체크되었는지 확인
    const isAllChecked = (subTaskList) => {
        return subTaskList?.length > 0 && subTaskList.every((subTask) => subTask.onChecked);
    };

    // mainTask 클릭 시 subTask 토글
    const toggleSubTasks = (index) => {
        setExpandedTasks((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className={styles.todoListContainer}>
            <div className={styles.todoListHeader}>
                <span>Todo List</span>
                <button className={styles.navigateButton} onClick={() => navigate("/todolist")}>
                    <a>&gt;</a>
                </button>
            </div>
            <div className={styles.toDo}>
                {toDoList?.length > 0 ? (
                    toDoList.map((item, mainIndex) => (
                        <div key={mainIndex} className={styles.mainTaskContainer}>
                            <div
                                className={`${styles.mainTask} ${
                                    isAllChecked(item.subTaskList) ? styles.completedMainTask : ""
                                }`}
                                onClick={() => toggleSubTasks(mainIndex)}
                            >
                                <p className={styles.mainTaskTitle}>{item.mainTask}</p>
                                <p>{item.date}</p>
                            </div>
                            {expandedTasks[mainIndex] && (
                                <div className={styles.subTaskList}>
                                    {item.subTaskList?.map((subItem, subIndex) => (
                                        <label key={subIndex} className={styles.subTask}>
                                            <input
                                                type="checkbox"
                                                checked={subItem.onChecked || false}
                                                onChange={() => handleCheck(mainIndex, subIndex)}
                                                className={styles.checkboxInput}
                                            />
                                            <span className={styles.checkbox}></span>
                                            <p className={styles.subTaskDetails}>{subItem.details}</p>
                                            <div className={styles.tags}>
                                                {subItem.tags?.map((tag, tagIndex) => (
                                                    <span key={tagIndex} className={styles.tag}>
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
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
