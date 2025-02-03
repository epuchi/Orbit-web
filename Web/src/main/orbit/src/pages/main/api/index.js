import axios from 'axios';
import REACT_APP_API_BASE_URL from "@/shared/assets/uri";
const baseURL = REACT_APP_API_BASE_URL;

async function getMainData() {
    try {
        console.log("데이터 호출 시작")
        const response = await axios.get(`${baseURL}/api/auth/MainData?resources=todoList,planner,alarm,board`, { //http://orbit-app.net:8090/api/auth/MainData
            headers: {
                "Content-Type": "application/json",
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