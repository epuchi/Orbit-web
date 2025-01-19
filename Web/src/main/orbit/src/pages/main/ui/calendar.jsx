import React from "react";
import { useNavigate } from "react-router-dom";
import { useMainModel } from "../model";

import styles from "./calendar.module.css";

const Calendar = () => {
    const navigate = useNavigate();
    const goToPlanner = () => navigate("/planner");

    // 모델에서 데이터와 가공 함수 가져오기
    const { getCalendarDates, getSchedulesByDate, getDayType } = useMainModel();

    // 달력에 표시할 날짜들
    const calendarDates = getCalendarDates();

    // 요일 배열 (일요일부터 시작)
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <div className={styles.calendarWrapper}>
            {/* 상단 헤더 영역 */}
            <div className={styles.calendarHeader}>
                <span>내 일정</span>
                <button className={styles.navigateButton} onClick={goToPlanner}>
                    <a>&gt;</a>
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className={styles.weekDaysHeader}>
                {weekDays.map((day, idx) => (
                    <div key={idx} className={styles.weekDay}>
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜들을 Grid로 배치 */}
            <div className={styles.calendarGrid}>
                {calendarDates.map((dateStr, idx) => {
                    const dailySchedules = getSchedulesByDate(dateStr);

                    // 날짜를 월.일 형식으로 변환 (마침표 제거 처리)
                    const dateObj = new Date(dateStr);
                    const formattedDate = `${dateObj.getMonth() + 1}.${dateObj.getDate()}`;

                    return (
                        <div key={idx} className={styles.calendarCell}>
                            {/* 날짜 표시 */}
                            <div className={styles.calendarDate}>{formattedDate}</div>

                            {/* 이 날짜에 걸치는 모든 일정 표시 */}
                            {dailySchedules.map((sch, i) => {
                                const dayType = getDayType(dateStr, sch);

                                return (
                                    <div
                                        key={i}
                                        className={[
                                            styles.eventBox,
                                            dayType === "start"
                                                ? styles.eventStart
                                                : dayType === "middle"
                                                    ? styles.eventMiddle
                                                    : dayType === "end"
                                                        ? styles.eventEnd
                                                        : styles.eventSingle,
                                        ].join(" ")}
                                        style={{
                                            backgroundColor: sch.color, // 일정 색상
                                        }}
                                    >
                                        <div className={styles.eventName}>{sch.name}</div>
                                        {sch.startTime && sch.endTime && (
                                            <div className={styles.eventTimeTooltip}>
                                                {sch.startTime} ~ {sch.endTime}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
