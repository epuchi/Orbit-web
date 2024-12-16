import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, sendVerificationCode, verifyEmailCode } from '../api/index';
import Signup from '../ui/index';

const SignupModel = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordCheck: '',
        verificationCode: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [codeSent, setCodeSent] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // 이메일 인증코드 전송 파트
    const handleSendCode = async () => {
        try {
            setLoading(true);
            setError('');
            await sendVerificationCode(formData.email);
            setCodeSent(true);
            alert('인증 코드가 이메일로 전송되었습니다.');
        } catch (error) {
            setError('인증 코드 전송 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };
    // 이메일 인증코드 확인 파트
    const handleVerifyCode = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await verifyEmailCode(formData.email, formData.verificationCode);
            if (response.verified) {
                setEmailVerified(true);
                alert('이메일 인증이 완료되었습니다.');
            } else {
                setError('인증 코드가 잘못되었습니다.');
            }
        } catch (error) {
            setError('이메일 인증 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        if (formData.password !== formData.passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        if (!emailVerified) {
            setError('이메일 인증을 완료해주세요.');
            setLoading(false);
            return;
        }

        try {
            await signup(formData);
            setSuccess(true);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Signup
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSendCode={handleSendCode}
            handleVerifyCode={handleVerifyCode}
            loading={loading}
            error={error}
            success={success}
            codeSent={codeSent}
            emailVerified={emailVerified}
        />
    );
};

export default SignupModel;

