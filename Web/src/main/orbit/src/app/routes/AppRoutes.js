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
import Index from '@/shared/components/topNavBar';

const AppRoutes = () => {
    const location = useLocation();

    // 네비게이션 바를 숨길 경로 설정
    const hideNavbarRoutes = ['/login', '/signup'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {/* 조건부 네비게이션 바 */}
            {!shouldHideNavbar && <Index />}

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
        </>
    );
};

export default AppRoutes;
