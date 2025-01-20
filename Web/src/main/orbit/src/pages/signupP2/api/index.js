import axios from 'axios';

export const signupProfile = async (formData) => {
    const requestBody = {
        profilePicture: formData.profilePicture, //프로필 사진
        nickname: formData.nickname, //닉네임
        birthdate: formData.birthdate, //생년월일
        phoneNumber: formData.phoneNumber //전화번호
    };

    const response = await axios.post(
        'http://orbit-app.net:3000/api/member/register', // API 엔드포인트
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json' // JSON 데이터 형식
            }
        }
    );

    return response.data; // 서버 응답 데이터 반환
};

export const cancelSignup = async (email) => {
    const requestBody = {
        email: email // 이메일 정보
    };

    const response = await axios.post(
        'http://orbit-app.net:3000/api/member/register', // API 엔드포인트
        requestBody,
        {
            headers: {
                'Content-Type': 'application/json' // JSON 데이터 형식
            }
        }
    );

    return response.data; // 서버 응답 데이터 반환
};
