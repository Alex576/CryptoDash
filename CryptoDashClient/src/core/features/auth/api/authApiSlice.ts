import { LogoutUrl } from "@/core/constants";
import type { OperationResultData } from "@/core/share/operation-result-data";
import { apiSlice } from "../../../apiSlice";
import type { AuthResponse, LoginRequest, LogoutRequest, RefreshTokenResponse, RegisterRequest } from "../models/auth";

export const authApiEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<OperationResultData<AuthResponse>, LoginRequest>({
            query: (credentials) => ({
                url: '/Authentication/Login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: '/Authorization/RefreshToken',
                method: 'POST',
            }),
        }),
        register: builder.mutation<OperationResultData<AuthResponse>, RegisterRequest>({
            query: (userData) => ({
                url: '/Authentication/Register',
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
