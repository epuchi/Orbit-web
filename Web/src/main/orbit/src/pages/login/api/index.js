import axios from 'axios';

// 이메일/비밀번호 로그인 API 호출
export const loginWithEmailPassword = async (email, password) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
    return response.data; // 로그인 성공 시 사용자 데이터 반환
};

// 구글 로그인 API 호출
export const loginWithGoogle = async (googleToken) => {
    const response = await axios.post('${API_BASE_URL}/google-signup', { token: googleToken }, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

// 카카오 로그인 API 호출
export const loginWithKakao = () => {
    try {
        const kakaoKey = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

        if (!kakaoKey) {
            alert('카카오 앱 키가 설정되지 않았습니다. 관리자에게 문의하세요.');
            console.error('Kakao JavaScript key is missing.');
            return;
        }

        if (!window.Kakao) {
            alert('카카오 SDK가 로드되지 않았습니다. 페이지를 새로고침 후 다시 시도해주세요.');
            console.error('Kakao SDK is not loaded.');
            return;
        }

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
            console.log('Kakao SDK initialized.');
        }

        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth/callback/kakao', // 리다이렉트 URI
        });

        console.log('Redirecting to Kakao login...');
    } catch (error) {
        console.error('Kakao Login Failed:', error.message);
        alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
    }
};


// 통합 로그인 API
const authApi = {
    loginWithEmailPassword,
    loginWithGoogle,
    loginWithKakao,
};

export default authApi;
