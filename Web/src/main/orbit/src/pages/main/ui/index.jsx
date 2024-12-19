import React, { useState, useRef } from 'react';
import styles from './styles.module.css';

const MainPage = () => {
    const userName = '류웨이';
    const [myProject, setMyProject] = useState([]);
    const projectViewRef = useRef(null);

    const handleAddProject = () => {

    };

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
                                    참여중인 프로젝트가 없으시군요! <br/> 프로젝트를 생성해보세요!
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
                        <button className={styles.navButton}>&gt;</button>
                    </div>
                    {/* Todo List 내용 추가 */}
                </div>
                <div className={styles.toDoList}>
                    <div className={styles.toDoHeader}>
                        <span>내 일정</span>
                        <button className={styles.navButton}>&gt;</button>
                    </div>
                    {/* 일정 내용 추가 */}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
