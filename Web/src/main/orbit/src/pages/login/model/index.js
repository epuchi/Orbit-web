import authApi from '../api/index';
import { initializeApp } from 'firebase/app';

/**
 * Firebase 설정 (app 변수를 사용하지 않으면 할당 생략)
 */
const firebaseConfig = {
    apiKey: "AIzaSyAfGC_Ks-MwsgtQrVKfC9iOdq25Fpj1Hc",
    authDomain: "orbit-bbc8f.firebaseapp.com",
    projectId: "orbit-bbc8f",
    storageBucket: "orbit-bbc8f.firebasestorage.app",
    messagingSenderId: "1020053061294",
    appId: "1:1020053061294:web:1bfdc7f2c59133689e373f"
};

initializeApp(firebaseConfig);
// app 변수가 필요 없다면 이렇게만 호출해도 됨

/**
 * useAuthModel 함수 선언문
 * - 화살표 함수가 아니라 'function' 선언문을 쓰면 호이스팅되어
 *   import 시 초기화 순서 문제 없이 참조 가능
 */
export function useAuthModel() {
    // 이메일/비밀번호 로그인
    const loginWithEmailPassword = async (email, password) => {
        try {
            const userData = await authApi.loginWithEmailPassword(email, password);
            console.log('userData : ' + userData);
            console.log('userData.successCode : ' + userData.successCode);
            if (userData.successCode === 200) {
                console.log('Login Successful (Email/Password):', userData.message);
                alert('로그인 성공!');
                return 1
            } else {
                console.log('Login Failed (Email/Password):', userData.message);
                alert(userData.data.message || '이메일/비밀번호 로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login Failed (Email/Password):', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || '이메일/비밀번호 로그인에 실패했습니다.');
        }
    };

    // 구글 로그인
    const loginWithGoogle = async (googleToken) => {
        try {
            const userData = await authApi.loginWithGoogle(googleToken);
            console.log('Login Successful (Google):', userData.data);
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

    // 훅이 반환할 메서드들
    return {
        loginWithEmailPassword,
        loginWithGoogle,
        loginWithKakao,
    };
}
