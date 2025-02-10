import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/authSlice';
import globalStyle from '@/shared/style/global.css'
import styles from './styles.module.css';
import logo from '@/shared/assets/img/logo_icon.png';

const TopNavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMain = () => {
        navigate('/main');
    };

    const handlePlanner = () => {
        navigate('/planner'); // 로그인 페이지로 이동
    };

    const handleTodo = () => {
        navigate('/todolist'); // 로그인 페이지로 이동
    };

    const handleBoard = () => {
        navigate('/board'); // 로그인 페이지로 이동
    };

    const handleAlarm = () => {
        navigate('/alarm'); // 로그인 페이지로 이동
    };

    const handleLogout = () => {
        dispatch(logout()); // Redux 상태 초기화 및 로컬 스토리지 정리
        navigate('/login', { replace: true }); // 로그인 페이지로 이동
    };

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <div className={styles.container}>
            <div className={styles.topArea}>
                <div className={styles.logoArea}>
                    <img onClick={handleMain} src={logo} alt={"logo"} className={styles.logo}/>
                </div>

                <div className={styles.navigateArea}>
                    <a onClick={handlePlanner} className={styles.navigateText}>일정관리</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={handleTodo} className={styles.navigateText}>투두</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={handleBoard} className={styles.navigateText}>보드</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={handleAlarm} className={styles.navigateText}>알림</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={handleLogout} className={styles.navigateText}>로그아웃</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={handleProfile} className={styles.navigateText}>프로필</a>
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
