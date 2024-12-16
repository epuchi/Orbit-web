import axios from 'axios';

//일반 회원가입 api
export const signup = async (formData) => {
    const response = await axios.post(`${"http://localhost:8080/api"}/signup`, formData, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};
//이메일 인증코드 보내기
export const sendVerificationCode = async (email) => {
    const response = await axios.post(`${"http://localhost:8080/api"}/send-verification-code`, { email }, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};
//이메일 인증코드 확인
export const verifyEmailCode = async (email, code) => {
    const response = await axios.post(`${"http://localhost:8080/api"}/verify-code`, { email, code }, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};



