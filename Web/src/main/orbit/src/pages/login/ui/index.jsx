import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuthModel } from '../model/index';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/redux/authSlice';

const LoginPage = () => {
    const { loginWithEmailPassword, loginWithGoogle, loginWithKakao } = useAuthModel();
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

        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const userData = await loginWithEmailPassword(email, password);
            if (userData === 1) {
                dispatch(login(userData));
                alert('로그인 성공!');
                navigate('/planner');
            } else {
                console.log('userData' + userData);
            }
        } catch (error) {
            console.error('Login Failed:', error);
            alert(error.message || '로그인에 실패했습니다.');
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log('Google Credential Response:', credentialResponse);
            const userData = await loginWithGoogle(credentialResponse.credential);
            if (!userData.token) {
                throw new Error('구글 로그인 실패: 유효한 토큰 없음');
            }
            dispatch(login(userData));
            alert('구글 로그인 성공!');
            navigate('/planner');
        } catch (error) {
            console.error('Google Login Failed:', error);
            alert(error.message || '구글 로그인 실패');
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error);
        alert('구글 로그인에 실패했습니다.');
    };

    const handleKakaoLogin = async () => {
        try {
            await loginWithKakao();
            alert('카카오 로그인 성공!');
            navigate('/planner');
        } catch (error) {
            console.error('Kakao Login Failed:', error);
            alert(error.message || '카카오 로그인에 실패했습니다.');
        }
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
        </div>
    );
};

export default LoginPage;
