import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/login/index';
import SignupPage from '@/pages/signup';
import MainPage from '@/pages/main';
import PlannerPage from '@/pages/planner';
import TodoListPage from '@/pages/todolist';
import BoardPage from '@/pages/board';
import AlarmPage from '@/pages/alarm';
import ProtectedRoute from './ProtectedRoute';
import NavBar from '@/shared/components/topNavBar';
import SideBar from '@/shared/components/sidBar';
import styles from './styles.module.css';
import globalStyle from '@/shared/style/global.css'

const AppRoutes = () => {
    const location = useLocation();

    // 네비게이션 바를 숨길 경로 설정
    const hideNavbarRoutes = ['/login', '/signup'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {/* 상단 네비게이션 바 */}
            {!shouldHideNavbar && <NavBar />}
            <div className={styles.layoutContainer}>
                {/* 왼쪽 사이드바 */}
                {!shouldHideNavbar && <SideBar />}
                <div className={styles.contentContainer}>
                    <Routes>
                        {/* 초기 경로 */}
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />

                        {/* 인증된 사용자만 접근 */}
                        <Route
                            path="/main"
                            element={
                                <ProtectedRoute>
                                    <MainPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/planner"
                            element={
                                <ProtectedRoute>
                                    <PlannerPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/todolist"
                            element={
                                <ProtectedRoute>
                                    <TodoListPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/board"
                            element={
                                <ProtectedRoute>
                                    <BoardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/alarm"
                            element={
                                <ProtectedRoute>
                                    <AlarmPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default AppRoutes;
