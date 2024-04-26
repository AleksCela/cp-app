import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        userData: JSON.parse(localStorage.getItem('userData')) || null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.userData = action.payload;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userData = null;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;