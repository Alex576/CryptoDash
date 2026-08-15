import { fetchBaseQuery, type BaseQueryApi, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { type RootState } from '../core/store';
import { Constants } from './constants';
import { logout, setNewToken } from './features/auth/authSlice';
import type { RefreshTokenResponse } from './features/auth/models/auth';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }): Headers => getHeader(getState, headers),
});

const secretQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }): Headers => getHeader(getState, headers),
});

export function baseQueryWithReauth(useCredentials: boolean = false): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    const query = useCredentials ? secretQuery : baseQuery;

    return async (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions
    ) => {
        let result = await query(args, api, extraOptions);

        if (result.error?.status === 401) {
            const refreshResult = await secretQuery(
                {
                    url: '/auth/refreshToken',
                    method: 'POST',
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const token = (refreshResult.data as RefreshTokenResponse).token;
                api.dispatch(setNewToken({ accessToken: token }));

                result = await query(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        }

        return result;
    };

}
function getHeader(getState: () => unknown, headers: Headers) {
    const token = (getState() as RootState).auth.token || localStorage.getItem(Constants.AccessToken);
    if (token) {
        headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
}

