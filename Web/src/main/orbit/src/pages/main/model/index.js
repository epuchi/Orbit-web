export function useMainModel() {
    // 예시: 사용자/프로젝트/할 일
    const userName = "UserName";
    const myProject = ["project1", "project2", "project3"];
    // 플래너 일정
    const planner = [
        {
            name: "회의(1)",
            startDate: "2024-12-23",
            endDate: "2024-12-23",
            startTime: "09:00",
            endTime: "15:00",
            color: "#fce4ec", // 연한 분홍색
        },
        {
            name: "회의(2)",
            startDate: "2024-12-23",
            endDate: "2024-12-24",
            startTime: "10:00",
            endTime: "12:00",
            color: "#d0f8ce", // 연한 녹색
        },
        {
            name: "프로젝트 작업",
            startDate: "2024-12-24",
            endDate: "2024-12-25",
            startTime: "14:00",
            endTime: "18:00",
            color: "#ffecb3", // 연한 노란색
        },
        {
            name: "운동",
            startDate: "2024-12-25",
            endDate: "2024-12-25",
            startTime: "",
            endTime: "",
            color: "#c8e6c9", // 연한 초록색
        },
    ];
    const toDoList = [
        {
            title: "학교 과제 제출",
            content: "프로그래밍 과제 제출 마감일은 이번 금요일입니다.",
            tag: "과제",
            onCheck: 0,
        },
        {
            title: "스터디 준비",
            content: "다음 스터디 주제는 React Hook입니다.",
            tag: "스터디",
            onCheck: 1,
        },
        {
            title: "학교 과제 제출",
            content: "프로그래밍 과제 제출 마감일은 이번 금요일입니다.",
            tag: "과제",
            onCheck: 0,
        },
        {
            title: "스터디 준비",
            content: "다음 스터디 주제는 React Hook입니다.",
            tag: "스터디",
            onCheck: 1,
        }, {
            title: "학교 과제 제출",
            content: "프로그래밍 과제 제출 마감일은 이번 금요일입니다.",
            tag: "과제",
            onCheck: 0,
        },
        {
            title: "스터디 준비",
            content: "다음 스터디 주제는 React Hook입니다.",
            tag: "스터디",
            onCheck: 1,
        }, {
            title: "학교 과제 제출",
            content: "프로그래밍 과제 제출 마감일은 이번 금요일입니다.",
            tag: "과제",
            onCheck: 0,
        },
        {
            title: "스터디 준비",
            content: "다음 스터디 주제는 React Hook입니다.",
            tag: "스터디",
            onCheck: 1,
        },
        {
            title: "학교 과제 제출",
            content: "프로그래밍 과제 제출 마감일은 이번 금요일입니다.",
            tag: "과제",
            onCheck: 0,
        },
        {
            title: "스터디 준비",
            content: "다음 스터디 주제는 React Hook입니다.",
            tag: "스터디",
            onCheck: 1,
        },
    ];


    // 달력의 날짜 배열 생성
    const getCalendarDates = () => {
        const today = new Date();
        const start = new Date(today);
        const end = new Date(today);

        start.setDate(today.getDate() - today.getDay());
        end.setDate(start.getDate() + 13);

        const dates = [];
        let current = new Date(start);
        while (current <= end) {
            const iso = current.toISOString().split("T")[0];
            dates.push(iso);
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    // 특정 날짜에 해당하는 일정 필터링
    const getSchedulesByDate = (dateStr) =>
        planner.filter(
            (sch) => sch.startDate <= dateStr && dateStr <= sch.endDate
        );

    // 일정의 위치 유형 판별
    const getDayType = (dateStr, sch) => {
        if (sch.startDate === sch.endDate) return "single";
        if (dateStr === sch.startDate) return "start";
        if (dateStr === sch.endDate) return "end";
        return "middle";
    };

    const userInfo = () => userName;
    const projectInfo = () => myProject;
    const toDoListInfo = () => toDoList;
    const plannerInfo = () => planner;

    return {
        userInfo,
        projectInfo,
        toDoListInfo,
        plannerInfo,
        getCalendarDates,
        getSchedulesByDate,
        getDayType,
    };
}
