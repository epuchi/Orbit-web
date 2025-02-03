import { useState, useEffect } from "react";
import authApi from "../api/index"; // API 모듈 import
import { useDispatch } from "react-redux";

export function useMainModel() {
    const dispatch = useDispatch();

    const [toDoList, setToDoList] = useState([]);
    const [planner, setPlanner] = useState([]);
    const [alarm, setAlarm] = useState([]);
    const [board, setBoard] = useState([]);
    const [userName, setUserName] = useState("UserName");
    const [myProject, setMyProject] = useState(["project1", "project2", "project3"]);

    // 데이터 fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("데이터 받아온다잉? ")
                const data = await authApi.getMainData();

                if (data) {
                    setToDoList(data.todoList ? [data.todoList] : []);
                    setPlanner(data.planner ? [data.planner] : []);
                    setAlarm(data.alarm || []);
                    setBoard(data.board || []);
                } else {
                    console.error("API 데이터가 없습니다.");
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                setToDoList([]);
                setPlanner([]);
                setAlarm([]);
                setBoard([]);
            }
        };

        fetchData();
    }, []);

    // 캘린더 날짜 생성
    const getCalendarDates = () => {
        const today = new Date();
        const start = new Date(today); // 오늘 날짜를 기준으로
        start.setDate(today.getDate() - today.getDay()); // 주의 첫 번째 날 설정

        const end = new Date(start);
        end.setDate(start.getDate() + 13); // 2주 범위 설정

        const dates = [];
        let current = new Date(start);

        while (current <= end) {
            const iso = current.toISOString().split("T")[0];
            dates.push(iso);
            current.setDate(current.getDate() + 1); // 다음 날로 이동
        }

        return dates;
    };

    // 특정 날짜에 해당하는 일정 필터링
    const getSchedulesByDate = (dateStr) =>
        planner.filter((sch) => sch.startDate <= dateStr && dateStr <= sch.endDate);

    // 일정의 위치 유형 판별
    const getDayType = (dateStr, sch) => {
        if (sch.startDate === sch.endDate) return "single";
        if (dateStr === sch.startDate) return "start";
        if (dateStr === sch.endDate) return "end";
        return "middle";
    };

    // 데이터 반환 함수
    const userData = () => userName;
    const projectData = () => myProject;
    const toDoListData = () => toDoList;
    const plannerData = () => planner;
    const boardData = () => board;
    const alarmData = () => alarm;

    return {
        userData,
        projectData,
        toDoListData,
        plannerData,
        getCalendarDates,
        getSchedulesByDate,
        getDayType,
        boardData,
        alarmData,
    };
}
