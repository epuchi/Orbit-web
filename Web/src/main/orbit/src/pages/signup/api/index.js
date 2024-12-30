import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

//일반 회원가입 api
// export const signup = async (formData) => {
//     const response = await axios.post(`${"http://34.64.173.72:3000/api/auth/signup"}/signup`, formData, {
//         headers: { 'Content-Type': 'application/json' },
//     });
//     return response.data;
// };

export const signup = async (formData) => {
    const requestBody = {

        formData: formData // 사용자 비밀번호
    };

    const response = await axios.post(
        'http://34.64.173.72:8090/api/auth/signup',
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};
//이메일 인증코드 보내기
// export const sendVerificationCode = async (email) => {
//     const response = await axios.post(`${"http://34.64.173.72:3000/api/auth/login"}/send-verification-code`, { email }, {
//         headers: { 'Content-Type': 'application/json' },
//     });
//     return response.data;
// };

export const sendVerificationCode = async (email) => {
    const requestBody = {
        email: email
    };

    const response = await axios.post(
        'http://34.64.173.72:8090/api/auth/signup',
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};
//이메일 인증코드 확인
// export const verifyEmailCode = async (email, code) => {
//     const response = await axios.post(`${"http://34.64.173.72:3000/api/auth/login"}/verify-code`, { email, code }, {
//         headers: { 'Content-Type': 'application/json' },
//     });
//     return response.data;
// };

export const verifyEmailCode = async (email, code) => {
    const requestBody = {
        email: email,
        code: code
    };

    const response = await axios.post(
        'http://34.64.173.72:8090/api/auth/signup',
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};



