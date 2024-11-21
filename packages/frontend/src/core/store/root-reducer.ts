import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/auth.slice';
import phishingReducer from '@/features/phishing/stores/phishing.slice';

export const rootReducer = combineReducers({
    auth: authReducer,
    phishing: phishingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;