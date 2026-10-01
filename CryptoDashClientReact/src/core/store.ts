import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import authReducer from '../core/features/auth/authSlice';
import subjectReducer from '../core/features/subject/subjectSlice';
import { apiSecuritySlice, apiSlice, dashboardApiSlice, layoutApiSlice } from './apiSlice';
import layoutReducer from './features/layout/layoutSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        subject: subjectReducer,
        layout: layoutReducer,
        [apiSecuritySlice.reducerPath]: apiSecuritySlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [layoutApiSlice.reducerPath]: layoutApiSlice.reducer,
        [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
        // [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSecuritySlice.middleware)
            .concat(apiSlice.middleware)
            .concat(layoutApiSlice.middleware)
            .concat(dashboardApiSlice.middleware)
    // .concat(settingsApiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;