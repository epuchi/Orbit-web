import React, { useRef } from "react";
import styles from "./project.module.css";
import { useMainModel } from "../model";
import { useNavigate } from "react-router-dom";

const Project = () => {
    const { projectData } = useMainModel();
    const myProjects = projectData();

    const projectScrollRef = useRef(null);

    const scrollLeft = () => {
        if (projectScrollRef.current) {
            projectScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (projectScrollRef.current) {
            projectScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.headerTitle}>내 프로젝트</span>
            </div>
            <div className={styles.projectContainer}>
                <button onClick={scrollLeft} className={styles.scrollButton}>
                    {"<"}
                </button>
                <div className={styles.projectListWrapper} ref={projectScrollRef}>
                    <div className={styles.projectList}>
                        {myProjects.length > 0 ? (
                            myProjects.map((project, index) => (
                                <div key={index} className={styles.projectCard}>
                                    <span>{project}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyProjectWrapper}>
                                <div className={styles.emptyProjectMessage}>
                                    참여중인 프로젝트가 없으시군요!
                                    <br />
                                    프로젝트를 생성해보세요!
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={scrollRight} className={styles.scrollButton}>
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Project;
