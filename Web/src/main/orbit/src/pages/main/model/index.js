export function useMainModel() {
    const userName = '정연수 어린이';
    const myProject = ['project1', 'project2', 'project3']; // 고정된 값 반환
    const toDoList = [
        {
            title: '학교 과제 제출',
            content: '프로그래밍 과제 제출 마감일은 이번 금요일입니다.',
            tag: '과제',
            onCheck: 0
        },
        {
            title: '스터디 준비',
            content: '다음 스터디 주제는 React Hook입니다.',
            tag: '스터디',
            onCheck: 1
        },
        {
            title: '운동',
            content: '주 3회 운동 목표를 설정하세요.',
            tag: '건강',
            onCheck: 0
        },
        {
            title: '읽기 목록 추가',
            content: '새로운 책 목록을 추가하고 매일 읽으세요.',
            tag: '자기계발',
            onCheck: 0
        },
        {
            title: '친구 생일 축하',
            content: '이번 주 토요일은 민수의 생일입니다.',
            tag: '기념일',
            onCheck: 1
        }
    ];
    const planner = [
        {
            name: '회의',
            startDate: 2024-12-23,
            endDate: 2024-12-23,
            startTime: '09:00',
            endTime: '15:00',

        }
    ]

    const userInfo = () => userName;

    const projectInfo = () => myProject;

    const toDoListInfo = () => toDoList

    return {
        userInfo,
        projectInfo,
        toDoListInfo
    };
}
