import React from "react";
import styles from "./alarm.module.css";
import {useMainModel} from "../model"; // 모델 import
import {useNavigate} from "react-router-dom";

// 투두 리스트 컴포넌트
const Alarm = () => {
    return (
        <div className={styles.alarmContainer}>
            <h3 className={styles.alarmTitle}>할 일</h3>
            <p className={styles.alarmText}>현재 없음</p>

            <h3 className={styles.alarmTitle}>최근 피드백</h3>
            <p className={styles.alarmText}>현재 없음</p>
        </div>
    );
};

export default Alarm;
