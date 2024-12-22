import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위한 useNavigate 훅
import styles from './styles.module.css';
import { signupProfile } from '../api';

const SignupDescription = () => {
    const [formData, setFormData] = useState({
        profilePicture: '',
        nickname: '',
        birthdate: '',
        phoneNumber: '',
        jobDescription: ''
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profilePicture: reader.result });
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await signupProfile(formData);
            setSuccess(true);
            alert('프로필 설정이 완료되었습니다. 로그인 페이지로 이동합니다.');
            navigate('/login'); // 성공 시 로그인 페이지로 이동
        } catch (err) {
            setError('프로필 설정 저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>프로필 설정</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <label className={styles.label}>프로필 사진</label>
                <div className={styles.profilePictureContainer}>
                    {preview ? (
                        <img src={preview} alt="Profile Preview" className={styles.profilePicture} />
                    ) : (
                        <div className={styles.placeholder}>이미지를 업로드하세요</div>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className={styles.input}
                    onChange={handleFileChange}
                />
                <label className={styles.label}>닉네임</label>
                <input
                    type="text"
                    name="nickname"
                    className={styles.input}
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
                <label className={styles.label}>생년월일</label>
                <input
                    type="date"
                    name="birthdate"
                    className={styles.input}
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                />
                <label className={styles.label}>휴대폰 번호</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    className={styles.input}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="010-1234-5678"
                    required
                />
                <label className={styles.label}>업무/직종</label>
                <input
                    type="text"
                    name="jobDescription"
                    className={styles.input}
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="예: 개발자, 디자이너, 마케팅 등"
                />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? '저장 중...' : '저장'}
                </button>
                {success && <p className={styles.success}>프로필 설정이 저장되었습니다!</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default SignupDescription;
