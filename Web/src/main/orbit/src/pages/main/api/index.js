import axios from 'axios';
import REACT_APP_API_BASE_URL from "@/shared/assets/uri";
const baseURL = REACT_APP_API_BASE_URL;

async function getMainData() {
    try {
        // 로컬 스토리지에서 user 데이터 가져오기
        const userDataString = localStorage.getItem("user");

        // JSON 데이터가 존재하면 파싱하여 객체로 변환
        const userData = userDataString ? JSON.parse(userDataString) : null;

        // authToken만 추출
        const authToken = userData?.data?.authToken || ""; // authToken이 없으면 빈 문자열 반환
        console.log("추출된 authToken:", authToken);

        const response = await axios.get(`${baseURL}/api/auth/MainData?resources=todoList,planner,alarm,board`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken ? `Bearer ${authToken}` : "", // 토큰이 있으면 Authorization 헤더에 추가
            },
        });
        console.log(response.data)
        if (response.data?.successCode === 200) {
            console.log("API 성공:", response.data.successResult);
            return response.data.data; // 필요한 데이터만 반환
        } else {
            console.log("API 실패 코드:", response.data.failCode);
            return null; // 실패 시 null 반환
        }
    } catch (error) {
        console.log("이거 왜 안되냐 ")
        console.error("API 호출 중 오류:", error.message);
        return null; // 에러 발생 시 null 반환
    }
}

const authApi = {
    getMainData,
};

export default authApi;