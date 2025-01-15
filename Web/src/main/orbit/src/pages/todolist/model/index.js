export class TodoModel {
    constructor(data = {}) {
      this.id = data.id;
      this.mainTask = data.mainTask || '';
      this.subTaskList = data.subTaskList || [];
      this.details = data.details || '';
      this.tags = data.tags || [];
      this.date = data.date || '';
      this.createdAt = data.createdAt || new Date().toISOString();
    }
  
    // API 응답으로부터 모델 인스턴스 생성
    static fromResponse(responseData) {
      if (Array.isArray(responseData)) {
        return responseData.map(data => new TodoModel(data));
      }
      return new TodoModel(responseData);
    }
  
    // 날짜별로 할 일 그룹화
    static groupByDate(todos) {
      return todos.reduce((grouped, todo) => {
        const date = todo.date;
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(todo);
        return grouped;
      }, {});
    }
  
    // 유효성 검사
    validate() {
      const errors = {};
  
      if (!this.mainTask?.trim()) {
        errors.mainTask = '주요 할 일은 필수입니다.';
      }
  
      if (!this.date) {
        errors.date = '날짜는 필수입니다.';
      }
  
      // 추가 작업 유효성 검사
      if (this.subTaskList.some(task => !task?.trim())) {
        errors.subTaskList = '빈 추가 작업이 있습니다.';
      }
  
      // 태그 유효성 검사
      if (this.tags.some(tag => !tag?.trim())) {
        errors.tags = '빈 태그가 있습니다.';
      }
  
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
  
    // API로 보낼 데이터 형식으로 변환
    toApiFormat() {
      return {
        mainTask: this.mainTask,
        subTaskList: this.subTaskList.filter(task => task?.trim()),
        details: this.details,
        tags: this.tags.filter(tag => tag?.trim()),
        date: this.date
      };
    }
  
    // 날짜 포맷팅
    static formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  
    // 할 일 검색
    static searchTodos(todos, searchTerm) {
      if (!searchTerm) return todos;
      
      return todos.filter(todo => 
        todo.mainTask.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        todo.subTaskList.some(task => 
          task.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };