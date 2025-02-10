import React, { useState } from 'react';
import styles from './styles.module.css';

const ProfileSettings = () => {
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({
        profilePicture: '/임시.jpg',
        nickname: '정연수',
        birthdate: '2077-01-01',
        phoneNumber: '010-1234-5678',
        jobDescription: '소림사 승려'
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setEditingField(null);
    };

    const renderValue = (label, value, name) => {
        if (editingField === name) {
            if (name === 'birthdate') {
                return (
                    <input
                        type="date"
                        name={name}
                        className={styles.input}
                        value={value}
                        onChange={handleChange}
                    />
                );
            }
            return (
                <input
                    type="text"
                    name={name}
                    className={styles.input}
                    value={value}
                    onChange={handleChange}
                    placeholder={`${label} 입력`}
                />
            );
        }
        return <div className={styles.value}>{value}</div>;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>프로필 설정</h1>
                <p className={styles.subtitle}>프로필 정보를 수정할 수 있습니다</p>
            </div>
            
            <form className={styles.form} onSubmit={handleSave}>
                <div className={styles.profileSection}>
                    <div className={styles.profilePictureContainer}>
                        {(preview || formData.profilePicture) && (
                            <img 
                                src={preview || formData.profilePicture} 
                                alt="Profile" 
                                className={styles.profilePicture} 
                            />
                        )}
                    </div>
                    {editingField === 'profilePicture' && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                                id="profilePicture"
                            />
                            <label htmlFor="profilePicture" className={styles.changePhotoButton}>
                                사진 변경
                            </label>
                        </>
                    )}
                </div>

                {Object.entries({
                    nickname: '닉네임',
                    birthdate: '생년월일',
                    phoneNumber: '휴대폰 번호',
                    jobDescription: '업무/직종'
                }).map(([key, label]) => (
                    <div className={styles.inputGroup} key={key}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>{label}</label>
                            {editingField !== key && (
                                <button 
                                    type="button"
                                    className={styles.editIcon}
                                    onClick={() => setEditingField(key)}
                                >
                                    ▶
                                </button>
                            )}
                            {editingField === key && (
                                <div className={styles.buttonGroup}>
                                    <button 
                                        type="button" 
                                        className={styles.cancelButton}
                                        onClick={() => setEditingField(null)}
                                    >
                                        취소
                                    </button>
                                    <button type="submit" className={styles.saveButton}>
                                        저장
                                    </button>
                                </div>
                            )}
                        </div>
                        {renderValue(label, formData[key], key)}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ProfileSettings;