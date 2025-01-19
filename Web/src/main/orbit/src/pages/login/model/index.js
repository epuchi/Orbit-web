import authApi from '../api/index';
import { initializeApp } from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/redux/authSlice';

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
    const dispatch = useDispatch();
    // 이메일/비밀번호 로그인
    const loginOrbit = async (email, password) => {
        // dispatch(login(userData));
        try {
            const userData = await authApi.loginOrbitAPI(email, password);
            if(userData != null) {
                return 200;
            } else {
                return 401;
            }
        } catch(error) {
            console.error('로그인 데이터 처리 중 알 수 없는 에러가 발생했습니다.');
            console.error(error)
            return 404;
        }
    }


    // 구글 로그인
    const loginGoogle = async (googleToken) => {
        try {
            const userData = await authApi.loginWithGoogle(googleToken);
            if (userData != null) {
                dispatch(login(userData))
                return 200;
            } else {
                return 401;
            }
        } catch (error) {
            console.error('로그인 데이터 처리 중 알 수 없는 에러가 발생했습니다.');
            console.error(error)
            return 404;
        }
    }

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
        loginOrbit,
        loginGoogle,
        loginWithKakao,
    };
}
