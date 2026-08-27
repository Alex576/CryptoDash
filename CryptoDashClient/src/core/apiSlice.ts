import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base-query';

export const apiSlice = createApi({
    reducerPath: 'api', // Имя ключа в Redux Store
    baseQuery: baseQueryWithReauth(true),
    tagTypes: ['Portfolio', 'Transaction'], // Теги для автоматического обновления кэша (аналог изменения данных)
    endpoints: () => ({}),
});

export const subjectApiSlice = createApi({
    reducerPath: 'subjectApi',
    baseQuery: baseQueryWithReauth(),
    tagTypes: ['Subject'],
    endpoints: () => ({}),
});


export const layoutApiSlice = createApi({
    reducerPath: 'layoutApi',
    baseQuery: baseQueryWithReauth(),
    tagTypes: ['Layout'],
    endpoints: () => ({}),
});

export const dashboardApiSlice = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseQueryWithReauth(),
    tagTypes: ['Chart', 'Table'],
    endpoints: () => ({}),
});

export const settingsApiSlice = createApi({
    reducerPath: 'settingsApi',
    baseQuery: baseQueryWithReauth(),
    tagTypes: [],
    endpoints: () => ({}),
});