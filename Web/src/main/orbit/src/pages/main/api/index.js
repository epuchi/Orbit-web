import axios from 'axios';
import REACT_APP_API_BASE_URL from "@/shared/assets/uri";
const baseURL = REACT_APP_API_BASE_URL;

async function getMainData() {
    try {
        const response = await axios.post(`${baseURL}/api/auth/MainData`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.data?.successCode === 200) {
            console.log("API 성공:", response.data.successResult);
            return response.data.data; // 필요한 데이터만 반환
        } else {
            console.log("API 실패 코드:", response.data.failCode);
            return null; // 실패 시 null 반환
        }
    } catch (error) {
        console.error("API 호출 중 오류:", error.message);
        return null; // 에러 발생 시 null 반환
    }
}

const authApi = {
    getMainData,
};

export default authApi;