import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/shared/assets/uri';
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
import SignupDetailsPage from '@/pages/signupP2';

const AppRoutes = () => {
    const location = useLocation();

    // 네비게이션 바를 숨길 경로 설정
    const hideNavbarRoutes = ['/login', '/signup', '/signupP2'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div style={{display:'flex', flex:1, flexDirection:'column', minWidth: '1200px'}}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                            <Route path="/signupP2" element={<SignupDetailsPage />} />

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
            </GoogleOAuthProvider>
        </div>
    );
};

export default AppRoutes;
