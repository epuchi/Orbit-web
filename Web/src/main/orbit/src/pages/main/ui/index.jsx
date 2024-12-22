import React, { useRef } from 'react';
import styles from './styles.module.css';
import { useMainModel } from "@/pages/main/model";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const { userInfo, projectInfo, toDoListInfo } = useMainModel();
    const userName = userInfo();
    const myProject = projectInfo();
    const toDoList = toDoListInfo();
    const projectViewRef = useRef(null);

    const scrollLeft = () => {
        if (projectViewRef.current) {
            projectViewRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (projectViewRef.current) {
            projectViewRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const goToTodoList = () => {
        navigate('/todolist');
    };

    const goToPlanner = () => {
        navigate('/planner');
    };

    return (
        <div className={styles.container}>
            <div className={styles.welcomeArea}>
                <span className={styles.welcomeText}>{userName}님 안녕하세요!</span>
            </div>

            <div className={styles.projectHeader}>
                <span className={styles.projectHeaderTitle}>내 프로젝트</span>
            </div>

            <div className={styles.projectControlArea}>
                <button onClick={scrollLeft} className={styles.scrollButton}>{'<'}</button>
                <div className={styles.projectViewWrapper} ref={projectViewRef}>
                    <div className={styles.projectViewArea}>
                        {myProject.length > 0 ? (
                            myProject.map((project, index) => (
                                <div key={index} className={styles.projectView}>
                                    <span>{project}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noProjectContainer}>
                                <div className={styles.noProjectMessage}>
                                    참여중인 프로젝트가 없으시군요! <br /> 프로젝트를 생성해보세요!
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={scrollRight} className={styles.scrollButton}>{'>'}</button>
            </div>

            <div className={styles.bottomArea}>
                <div className={styles.toDoList}>
                    <div className={styles.toDoHeader}>
                        <span>Todo List</span>
                        <button className={styles.navButton} onClick={goToTodoList}>&gt;</button>
                    </div>
                    <div className={styles.scrollableList}>
                        {toDoList.length > 0 ? (
                            toDoList.map((item, index) => (
                                <div key={index} className={styles.todoItem}>
                                    <input
                                        type="checkbox"
                                        checked={item.onCheck === 1}
                                        readOnly
                                    />
                                    <div className={styles.todoText}>
                                        <span className={styles.todoTitle}>{item.title}</span>
                                        <p className={styles.todoContent}>{item.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>할 일이 없습니다!</span>
                        )}
                    </div>
                </div>

                <div className={styles.toDoList}>
                    <div className={styles.toDoHeader}>
                        <span>내 일정</span>
                        <button className={styles.navButton} onClick={goToPlanner}>&gt;</button>
                    </div>
                    {/* 일정 내용 추가 */}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
