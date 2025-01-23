import axios from 'axios';
import REACT_APP_API_BASE_URL from '@/shared/assets/uri'
const baseURL = REACT_APP_API_BASE_URL;



export const signup = async (formData) => {
    const requestBody = {

        formData: formData // 사용자 비밀번호
    };

    const response = await axios.post(
        'http://orbit-app.net:8090/api/auth/signup',
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};

export const sendVerificationCode = async (email) => {
    const params = new URLSearchParams({
        email: email
    });

    const response = await axios.post(
        `http://orbit-app.net:8090/api/auth/SendCode?${params.toString()}`,
        null,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};


export const verifyEmailCode = async (email, code) => {
    const requestBody = {
        email: email,
        code: code,
        requestTime: new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\./g, '-').replace(',', '')
    };

    const response = await axios.post(
        'http://orbit-app.net:8090/api/auth/VerifyCode',
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};



