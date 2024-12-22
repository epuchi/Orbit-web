import React, { useState } from 'react';
import styles from './styles.module.css';

const SideBar = () => {
    const myProjects = ['Orbit', 'CampusLife', 'project3'];
    const categories = [
        '브레인스토밍/마인드맵',
        '일정표',
        'Docs',
        '공지사항',
        '맴버정보/관리',
        '프로젝트 정보',
    ];

    const [activeProject, setActiveProject] = useState(null);

    const category = (project) => {
        if (activeProject === project) {
            setActiveProject(null); // 이미 열려 있으면 닫음
        } else {
            setActiveProject(project); // 다른 프로젝트 열기
        }
    };

    return (
        <div className={styles.container}>
            {myProjects.map((project, index) => (
                <div key={index} className={styles.project}>
                    {/* 프로젝트 이름 */}
                    <a
                        className={styles.projectText}
                        onClick={() => category(project)}
                    >
                        {project}
                    </a>
                    {/* 하위 카테고리 */}
                    <div
                        className={`${styles.categoryContainer} ${
                            activeProject === project ? styles.open : ''
                        }`}
                    >
                        {categories.map((category, idx) => (
                            <a key={idx} className={styles.categoryItem}>
                                {category}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SideBar;
