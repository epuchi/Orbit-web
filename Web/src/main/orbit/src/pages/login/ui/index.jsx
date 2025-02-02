import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuthModel } from '../model/index';
import { useDispatch, useSelector } from 'react-redux';
import KakaoLogin from "react-kakao-login";
import { KAKAO_JAVASCRIPT_KEY } from '@/shared/assets/uri';
import { login } from '@/app/redux/authSlice';

const LoginPage = () => {
    const { loginOrbit, loginGoogle, loginWithKakao } = useAuthModel();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/planner', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        /* 개발용 테스트 계정 */
        if (email == 'jite1214@gmail.com') {
            const userData = email
            dispatch(login(userData));
            navigate('/planner');
        }

        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const loginCode = await loginOrbit(email, password);
            if (loginCode === 200) {
                navigate('/planner');
            } else if (loginCode === 401) {
                alert('이메일 또는 비밀번호를 확인해주세요.');
            } else if (loginCode === 404) {
                alert('오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const loginCode = await loginGoogle(credentialResponse.credential);
            if (loginCode === 200) {
                console.log("로그인 성공!!!!! " , loginCode)
                navigate('/main');
            } else if (loginCode === 401) {
                alert('이메일 또는 비밀번호를 확인해주세요.');
            } else if (loginCode === 404) {
                alert('오류가 발생했습니다.');
            } else {
                alert('로그인 중 오류 발생')
            }
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        // console.error('Google Login Failed:', error);
        alert('구글 로그인에 실패했습니다.');
    };

    const kakaoOnSuccess = async (data) => {
        console.log(data)
        // const idToken = data.response.access_token
        try {
            const loginCode = await loginWithKakao(data.response.access_token);
            console.log("loginCode : ", loginCode)
            if (loginCode === 200) {
                navigate('/main');
            } else if (loginCode === 401) {
                alert('이메일 또는 비밀번호를 확인해주세요.');
            } else if (loginCode === 404) {
                alert('오류가 발생했습니다.');
            } else {
                alert('로그인 중 오류 발생')
            }
        } catch (error) {
            console.error('kakao Login Failed:', error);
        }
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    const goToSignup = () => navigate('/signup');

    return (
        <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '400px' }}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', textAlign: 'left' }}>
                <h2>이메일/비밀번호 로그인</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">이메일:</label>
                    <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                    로그인
                </button>
            </form>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
            />
            <KakaoLogin
                token={KAKAO_JAVASCRIPT_KEY}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
            />
            <div style={{ marginTop: '20px' }}>
                <p>계정이 없으신가요?</p>
                <button
                    onClick={goToSignup}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
