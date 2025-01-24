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
    const toDoList1 = [
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
    const toDoList2 = [
        {
            mainTask: '과제하기',
            subTaskList: ['C과제', 'JAVA과제'],
            details: '대학 과제',
            tag: ['과제', '대학'],
            date: '2025-01-07',
            onChecked: [1, 0]
        },
        {
            mainTask: 'test',
            subTaskList: ['test'],
            details: '대학 과제',
            tag: ['과제'],
            date: '2025-01-07',
            onChecked: [0]
        },
        {
            mainTask: 'test',
            subTaskList: [],
            details: '대학 과제',
            tag: ['과제'],
            date: '2025-01-07',
            onChecked: []
        },
    ]

    let toDoList = [
        {
            mainTask: 'mainTask',
            subTaskList: [
                {
                    task: 'task1',
                    details: 'details1',
                    tags: ['tag1', 'tag2'],
                    onChecked: 0
                },
                {
                    task: 'task2',
                    details: 'details2',
                    tags: ['tag1'],
                    onChecked: 1
                },
            ],
            date: '2025-01-02'
        },
        {
            mainTask: 'mainTask',
            subTaskList: [
                {
                    task: 'task1',
                    details: 'details1',
                    tags: ['tag1', 'tag2'],
                    onChecked: 1
                },
                {
                    task: 'task2',
                    details: 'details2',
                    tags: ['tag1'],
                    onChecked: 1
                },
            ],
            date: '2025-01-02'
        },{
            mainTask: 'mainTask',
            subTaskList: [
                {
                    task: 'task1',
                    details: 'details1',
                    tags: ['tag1', 'tag2'],
                    onChecked: 1
                },
                {
                    task: 'task2',
                    details: 'details2',
                    tags: ['tag1'],
                    onChecked: 1
                },
            ],
            date: '2025-01-02'
        },
    ]

    const alarm = [
        {
            id: 123123,
            name: "문서 수정 요청",
            project: "Orbit",

        },
        {
            id: 123123,
            name: "일정 추가",
            project: "Orbit",

        },
    ]
    const board = [
        {
            id: 123123,
            name: 'UI 개발',
            type: '개발',
            summation: '메인페이지, 캘린더, 투두 리스트 UI 개발'
        },
        {
            id: 123123,
            name: 'UI 개발',
            type: '개발',
            summation: '메인페이지, 캘린더, 투두 리스트 UI 개발'
        },
    ]


    const getCalendarDates = () => {
        const today = new Date();
        const start = new Date(today); // 오늘 날짜를 기준으로

        // 현재 주의 첫 번째 날(일요일)로 설정
        start.setDate(today.getDate() - today.getDay());

        const end = new Date(start); // 종료일

        // 종료일을 13일 뒤로 설정 (2주 범위)
        const endDate = start.getDate() + 13
        end.setDate(endDate);

        const dates = [];
        let current = new Date(start);

        // 정확히 2주(14일)까지만 날짜 추가
        while (current <= end) {
            const iso = current.toISOString().split("T")[0];
            dates.push(iso);
            current.setDate(current.getDate() + 1); // 다음 날로 이동
        }

        // 디버깅 로그
        console.log('Start Date:', start);
        console.log('End Date:', end);
        console.log("Generated Calendar Dates:", dates);

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
        alarmData
    };
}
