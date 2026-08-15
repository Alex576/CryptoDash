import { LogoutUrl } from "@/core/constants";
import { apiSlice } from "../../../apiSlice";
import type { AuthResponse, LoginRequest, LogoutRequest, RefreshTokenResponse, RegisterRequest, RegisterResponse } from "../models/auth";

export const authApiEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: '/auth/refreshToken',
                method: 'POST',
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.query<void, LogoutRequest>({
            query: (data) => ({
                url: LogoutUrl,
                method: 'POST',
                body: data
            })

        })
    }),
    // Позволяет повторно внедрять эндпоинты при горячей перезагрузке (HMR) в Vite
    overrideExisting: false,
});

// RTK Query автоматически генерирует хуки на основе имени эндпоинта
// Название строится по шаблону: use + [ИмяЭндпоинта] + [Mutation или Query]
export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutQuery } = authApiEndpoints;
