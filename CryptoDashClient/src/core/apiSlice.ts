import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base-query';

export const apiSlice = createApi({
    reducerPath: 'api', // Имя ключа в Redux Store
    baseQuery: baseQueryWithReauth(true),
    tagTypes: ['Portfolio', 'Transaction'], // Теги для автоматического обновления кэша (аналог изменения данных)
    endpoints: () => ({}),
});

export const subjectApiSlice = createApi({
    reducerPath: 'subjectApi', // Имя ключа в Redux Store
    baseQuery: baseQueryWithReauth(),
    tagTypes: ['Subject'], // Теги для автоматического обновления кэша (аналог изменения данных)
    endpoints: () => ({}),
});