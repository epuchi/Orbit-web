import React, { useState } from 'react';
import styles from './styles.module.css';

const SignupDescription = ({ handleSubmit }) => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        nickname: '',
        birthdate: '',
        phoneNumber: '' // 휴대폰 번호 추가
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file });
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
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
                    placeholder="010-1234-5678" // 예제 형식 추가
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" // 기본 패턴 검증
                    required
                />
                <button type="submit" className={styles.button}>
                    저장
                </button>
            </form>
        </div>
    );
};

export default SignupDescription;




