import React, { useRef } from "react";
import styles from "./styles.module.css";
import { useMainModel } from "@/pages/main/model"; // 예시: 원하는 model import
import Project from "./project";
import Calendar from "./calendar";
import TodoList from "./todoList";
import Alarm from "./alarm"

const MainPage = () => {

    // 모델에서 사용자 정보, 프로젝트, 투두 리스트 가져오기
    const { userInfo } = useMainModel();
    const userName = userInfo();



    return (
        <div className={styles.container}>
            {/* 메인 섹션 */}
            <div className={styles.section}>
                {/* 상단 헤더 */}
                <div className={styles.section_header}>
                    <span className={styles.section_header_text}>
                        {userName}님 안녕하세요!
                    </span>
                </div>

                {/* 프로젝트 섹션 */}
                <div className={styles.section_body}>
                    <Project />
                </div>

                {/* 하단 (투두 리스트 + 내 일정) */}
                <div className={styles.section_footer}>
                    {/* 투두 리스트 */}
                    <div className={styles.section_toDoList}>
                        <TodoList />
                    </div>

                    {/* 내 일정 (2주) */}
                    <div className={styles.section_planner}>
                        <Calendar />
                    </div>
                </div>
            </div>

            {/* 알림(aside) */}
            <aside className={styles.aside}>
                <Alarm />
            </aside>
        </div>
    );
};

export default MainPage;
