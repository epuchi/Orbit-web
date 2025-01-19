import React from "react";
import styles from "./alarm.module.css";
import { useMainModel } from "../model"; // 모델 import

const Alarm = () => {
    const { boardData, alarmData } = useMainModel();
    const alarms = alarmData();
    const board = boardData();

    return (
        <div className={styles.container}>
            <div className={styles.topArea}>
                <a className={styles.alarmTitle}>
                    할 일
                </a>
            </div>
            <a className={styles.titleText}>알람</a>

            {alarms.length > 0 ? (
                alarms.map((alarms) => (
                    <div key={alarms.id} className={styles.alarmContainer}>
                        <p className={styles.alarmName}>{alarms.name}</p>
                        <p className={styles.alarmProject}>{alarms.project}</p>
                    </div>
                ))
            ) : (
                <div className={styles.nullAlarmText}>알림 없음</div>
            )}

            <a className={styles.titleText}>보드</a>

            {board.length > 0 ? (
                board.map((board) => (
                    <div key={board.id} className={styles.boardItem}>
                        <p className={styles.boardName}>{board.name}</p>
                        <p className={styles.boardType}>{board.type}</p>
                        <p className={styles.boardSummation}>{board.summation}</p>
                    </div>
                ))
            ) : (
                <p className={styles.nullAlarmText}>보드 없음</p>
            )}
        </div>
    );
};

export default Alarm;
