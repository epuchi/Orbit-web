import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuthModel } from '../model/index';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '@/app/redux/authSlice';

const LoginPage = () => {
    const { loginWithEmailPassword, loginWithGoogle, loginWithKakao } = useAuthModel();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // react-router-dom의 useNavigate 훅 사용
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // 이미 로그인된 경우, 로그인 페이지 접근 방지
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/planner', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (formData.email === 'test@example.com' && formData.password === '1') {
            // Redux 상태에 로그인 설정
            dispatch(login({ username: 'Test User', email: 'test@example.com' }));
            alert('로그인 성공!');
            navigate('/planner'); // 로그인 후 '/planner'로 이동
            return;
        } else {
            alert('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            await loginWithEmailPassword(email, password);
            navigate('/dashboard'); // 로그인 성공 시 대시보드로 이동
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            await loginWithGoogle(response.credential);
            navigate('/dashboard'); // 로그인 성공 시 대시보드로 이동
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error);
        alert('구글 로그인에 실패했습니다.');
    };

    const handleKakaoLogin = async () => {
        try {
            await loginWithKakao();
            navigate('/dashboard'); // 로그인 성공 시 대시보드로 이동
        } catch (error) {
            console.error('Kakao Login Failed:', error);
        }
    };

    const goToSignup = () => {
        navigate('/signup'); // 회원가입 페이지로 이동
    };

    const goToDashboard = () => {
        navigate('/planner'); // 회원가입 페이지로 이동
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '400px' }}>
                <h1>로그인</h1>

                <form onSubmit={handleSubmit} style={{ marginBottom: '30px', textAlign: 'left' }}>
                    <h2>이메일/비밀번호 로그인</h2>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email">이메일:</label>
                        <input
                            type="email"
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

                <hr style={{ margin: '30px 0' }} />

                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                />

                <button
                    onClick={handleKakaoLogin}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#FEE500',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                    Login with Kakao
                </button>

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
                <button
                onClick={goToDashboard}>
                    테스트용
                </button>
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginPage;
