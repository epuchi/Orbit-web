import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;



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



