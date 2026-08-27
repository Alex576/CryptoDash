import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import authReducer from '../core/features/auth/authSlice';
import subjectReducer from '../core/features/subject/subjectSlice';
import { apiSlice, dashboardApiSlice, layoutApiSlice, settingsApiSlice, subjectApiSlice } from './apiSlice';
import layoutReducer from './features/layout/layoutSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        subject: subjectReducer,
        layout: layoutReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [subjectApiSlice.reducerPath]: subjectApiSlice.reducer,
        [layoutApiSlice.reducerPath]: layoutApiSlice.reducer,
        [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
        [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(subjectApiSlice.middleware)
            .concat(layoutApiSlice.middleware)
            .concat(dashboardApiSlice.middleware)
            .concat(settingsApiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;