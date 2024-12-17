import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('user'), // 로컬 스토리지 확인
    user: JSON.parse(localStorage.getItem('user')) || null,
    signupSuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // 로컬 스토리지에 저장
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user'); // 로컬 스토리지에서 삭제
        },
        signup(state, action) {
            state.signupSuccess = true;
            state.user = action.payload;
        },
    },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
