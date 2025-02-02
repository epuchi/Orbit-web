import axios from 'axios';
import REACT_APP_API_BASE_URL, { KAKAO_JAVASCRIPT_KEY, KAKAO_REST_API_KEY } from '@/shared/assets/uri'; // KAKAO_JAVASCRIPT_KEY 가져오기

const baseURL = REACT_APP_API_BASE_URL;

/**
 * Orbit 로그인
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 * @returns {Object} 유저 정보 데이터 반환
 */
async function loginOrbitAPI(email, password) {
    try {
        const requestBody = {
            email,
            password
        };
        const response = await axios.post(
            `${baseURL}/api/auth/login`, requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        console.log(response.data);
        if (response.data.sucessCode === 200) {
            console.log('code : ' , response.data.sucessCode)
            console.log(response.data.sucessResult);
            return response.data
        }else if (response.data.failCode === 404) {
            console.log('code : ' , response.data.failCode)
            console.log(response.data.failResult);
            return response.data
        } else {
            throw new Error()
        }
    } catch (error) {
        console.error('Orbit 로그인 중 에러가 발생하였습니다.');
        console.error('에러 메시지 : ', error.message);
        return error
    }
}


/**
 * Google 로그인
 * @param {string} googleToken 사용자 이메일
 * @returns {Object} 유저 정보 데이터 반환
 */
async function loginWithGoogle(googleToken) {
    try {
        const response = await axios.post(
            `${baseURL}/api/auth/googlelogin?token=${googleToken}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if(response.data.successCode == 200) {
            console.log('successCode : ' , response.data.successCode)
            console.log(response.data.sucessResult);
        } else if (response.data.failCode){
            console.log('failCode : ' , response.data.failCode)
            console.log(response.data.failResult);
        }
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error('Google 로그인 중 에러가 발생하였습니다.');
        console.error('에러 메시지 : ', error.message);
    }
}


/**
 * 카카오 로그인 - 카카오 SDK를 사용해 리다이렉트
 * (실제 인증 처리는 백엔드의 /api/auth/login 에서 인가코드 받아 진행)
 */
// function loginWithKakao() {
//     const REDIRECT_URI = `${baseURL}/api/auth/kakaologin`
//     const REST_API_KEY = KAKAO_REST_API_KEY
//     const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//     try {
//
//         if (!window.Kakao) {
//             console.log(window.kakao)
//             throw new Error('카카오 SDK가 로드되지 않았습니다.');
//         }
//
//
//         if (!window.Kakao.isInitialized()) {
//             console.log(window.Kakao.isInitialized())
//             window.Kakao.init(REST_API_KEY);
//         }
//
//         // 리다이렉션을 통해 카카오 로그인 처리
//         window.Kakao.Auth.authorize({
//             redirectUri: REDIRECT_URI,
//         });
//
//
//         console.log('Redirecting to Kakao login...');
//     } catch (error) {
//         console.error('Kakao Login Failed:', error.message);
//         alert(error.message || '카카오 로그인에 실패했습니다. 다시 시도해주세요.');
//     }
// }

async function loginWithKakao(access_token) {
    try {
        const response = await axios.post(
            `${baseURL}/api/auth/kakaologin?code=${access_token}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if(response.data.sucessCode) {
            console.log('sucessCode : ' , response.data.sucessCode)
            console.log(response.data.sucessResult);
        } else if (response.data.failCode){
            console.log('failCode : ' , response.data.failCode)
            console.log(response.data.failResult);
        }
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('kakao 로그인 중 에러가 발생하였습니다.');
        console.error('에러 메시지 : ', error.message);
    }
}


// export 한 객체를 다른 파일에서 import해서 사용
const authApi = {
    loginOrbitAPI,
    loginWithGoogle,
    loginWithKakao
};

export default authApi;
