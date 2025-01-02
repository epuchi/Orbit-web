import axios from 'axios';
import REACT_APP_API_BASE_URL, { KAKAO_JAVASCRIPT_KEY } from '@/shared/assets/uri'; // KAKAO_JAVASCRIPT_KEY 가져오기

const baseURL = REACT_APP_API_BASE_URL;

/**
 * 이메일/비밀번호 로그인
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 * @returns {Object} 서버 응답 데이터 (예: { token, user } 등)
 */
async function loginWithEmailPassword(email, password) {
    try {
        const requestBody = {
            email: email,    // 사용자 이메일
            password: password // 사용자 비밀번호
        };
        const response = await axios.post(
            `${baseURL}/api/auth/login`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('response : ' + response)

        // 서버 응답에서 성공 여부를 확인
        if (!response.data.success) {
            throw new Error(response.data.message || '로그인 실패');
        }

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '로그인 요청에 실패했습니다.';
    }
}


/**
 * 구글 로그인
 * @param {string} googleToken 구글에서 받은 credential
 * @returns {Object} 서버 응답 데이터
 */
async function loginWithGoogle(googleToken) {
    try {
        const response = await axios.post(
            `${baseURL}/api/auth/login`,
            { token: googleToken },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // 서버 응답에서 성공 여부 확인
        if (!response.data.success) {
            throw new Error(response.data.message || '구글 로그인 실패');
        }

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '구글 로그인 요청에 실패했습니다.';
    }
}


/**
 * 카카오 로그인 - 카카오 SDK를 사용해 리다이렉트
 * (실제 인증 처리는 백엔드의 /api/auth/login 에서 인가코드 받아 진행)
 */
function loginWithKakao() {
    try {
        const kakaoKey = KAKAO_JAVASCRIPT_KEY;

        if (!kakaoKey) {
            throw new Error('카카오 앱 키가 설정되지 않았습니다.');
        }

        if (!window.Kakao) {
            throw new Error('카카오 SDK가 로드되지 않았습니다.');
        }

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
        }

        // 리다이렉션을 통해 카카오 로그인 처리
        window.Kakao.Auth.authorize({
            redirectUri: `${baseURL}/api/auth/login`,
        });

        console.log('Redirecting to Kakao login...');
    } catch (error) {
        console.error('Kakao Login Failed:', error.message);
        alert(error.message || '카카오 로그인에 실패했습니다. 다시 시도해주세요.');
    }
}


// export 한 객체를 다른 파일에서 import해서 사용
const authApi = {
    loginWithEmailPassword,
    loginWithGoogle,
    loginWithKakao,
};

export default authApi;
