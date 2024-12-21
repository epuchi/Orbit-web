import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 CSS 유지
import './reactCalendarOverrides.css'; // 글로벌 CSS 파일 추가
import styles from './styles.module.css'; // 기존 모듈 CSS 유지

const TodoListPage = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // 현재 날짜를 설정
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    const handleDateChange = (date) => {
        setCalendarDate(date);
        setSelectedDate(date.toLocaleDateString('ko-KR'));
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.todoContainer}>
                <h1 className={styles.head}>Todo</h1>
                <div className={styles.dateDisplayContainer}>
                    <span className={styles.dateDisplay}>{currentDate}</span>
                </div>
                <form>
                    <label className={styles.inputContainer}>
                        <input type="text" className={styles.inputField} placeholder="오늘의 일정을 적어주세요!" />
                        <input type="text" className={styles.inputField} placeholder="일정의 설명을 적어주세요!" />
                        <input
                            type="text"
                            className={styles.inputField}
                            value={selectedDate}
                            readOnly
                            placeholder="날짜를 선택하세요"
                        />
                        <input type="text" className={styles.inputField} placeholder="원하시는 태그가 있을까요?" />
                    </label>
                </form>
            </div>

            <div className={styles.calendarContainer}>
                <div className={styles.calendarContent}>
                    <Calendar
                        onChange={handleDateChange}
                        value={calendarDate}
                        className={styles.reactCalendar}
                        formatDay={(locale, date) => date.getDate()}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoListPage;



