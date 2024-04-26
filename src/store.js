import { configureStore } from '@reduxjs/toolkit'
import userReducer from './store/userReducer'

const initialState = {
    user: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        userData: JSON.parse(localStorage.getItem('userData')) || null,
    },
};

export const store = configureStore({
    reducer: { user: userReducer, },
    preloadedState: initialState,
})