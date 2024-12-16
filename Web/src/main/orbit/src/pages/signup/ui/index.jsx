import React from 'react';
import styles from './styles.module.css';

const Signup = ({
                    formData,
                    handleChange,
                    handleSubmit,
                    handleSendCode,
                    handleVerifyCode,
                    loading,
                    error,
                    success,
                    codeSent,
                    emailVerified,
                }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>아이디</label>
                <input
                    type="text"
                    name="username"
                    className={styles.input}
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label className={styles.label}>이메일</label>
                <input
                    type="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleSendCode}
                    disabled={loading || emailVerified}
                >
                    {codeSent ? '코드 재전송' : '인증 코드 보내기'}
                </button>

                {codeSent && !emailVerified && (
                    <>
                        <label className={styles.label}>인증 코드</label>
                        <input
                            type="text"
                            name="verificationCode"
                            className={styles.input}
                            value={formData.verificationCode}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className={styles.button}
                            onClick={handleVerifyCode}
                            disabled={loading}
                        >
                            인증 확인
                        </button>
                    </>
                )}

                {emailVerified && <p className={styles.success}>이메일 인증 완료!</p>}

                <label className={styles.label}>비밀번호</label>
                <input
                    type="password"
                    name="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label className={styles.label}>비밀번호 확인</label>
                <input
                    type="password"
                    name="passwordCheck"
                    className={styles.input}
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className={styles.button} disabled={loading || !emailVerified}>
                    {loading ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
            {success && <p className={styles.success}>회원가입 성공!</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Signup;

