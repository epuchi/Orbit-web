import React from "react";
import styles from "./alarm.module.css";
import { useMainModel } from "../model"; // 모델 import

const Alarm = () => {
    const { alarmData } = useMainModel();
    const alarms = alarmData();

    return (
        <div className={styles.alarmContainer}>
            <div className={styles.topArea}>
                <a className={styles.alarmTitle}>
                    할 일
                </a>
            </div>
            {alarms.length > 0 ? (
                alarms.map((alarm) => (
                    <div key={alarm.id} className={styles.alarmItem}>
                        <p className={styles.alarmName}>{alarm.name}</p>
                        <p className={styles.alarmType}>{alarm.type}</p>
                        <p className={styles.alarmSummation}>{alarm.summation}</p>
                    </div>
                ))
            ) : (
                <p className={styles.nullAlarmText}>현재 없음</p>
            )}
        </div>
    );
};

export default Alarm;
