import authApi from '../api/index';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfGC_Ks-MwsgtqQrVKfC9iOdq25Fpj1Hc",
    authDomain: "orbit-bbc8f.firebaseapp.com",
    projectId: "orbit-bbc8f",
    storageBucket: "orbit-bbc8f.firebasestorage.app",
    messagingSenderId: "1020053061294",
    appId: "1:1020053061294:web:1bfdc7f2c59133689e373f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const useAuthModel = () => {
    // 이메일/비밀번호 로그인
    const loginWithEmailPassword = async (email, password) => {
        try {
            const userData = await authApi.loginWithEmailPassword(email, password);
            console.log('Login Successful (Email/Password):', userData);
            alert('로그인 성공!');
        } catch (error) {
            console.error('Login Failed (Email/Password):', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || '이메일/비밀번호 로그인에 실패했습니다.');
        }
    };

    // 구글 로그인
    const loginWithGoogle = async (googleToken) => {
        try {
            const userData = await authApi.loginWithGoogle(googleToken);
            console.log('Login Successful (Google):', userData);
            alert('구글 로그인 성공!');
        } catch (error) {
            console.error('Login Failed (Google):', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || '구글 로그인에 실패했습니다.');
        }
    };

    // 카카오 로그인
    const loginWithKakao = () => {
        try {
            authApi.loginWithKakao();
            console.log('Redirecting to Kakao login...');
        } catch (error) {
            console.error('Kakao Login Failed:', error.message);
            alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return {
        loginWithEmailPassword,
        loginWithGoogle,
        loginWithKakao,
    };
};
