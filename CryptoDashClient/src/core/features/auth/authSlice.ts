import { Constants } from "@/core/constants";
import { tryParse } from "@/core/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse } from "./models/auth";

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    // isAuthenticated: boolean;
}

const initialState = (): AuthState => {
    const data: AuthState = { user: null, token: null };

    try {
        data.user = tryParse<User>(localStorage.getItem(Constants.User));
        data.token = localStorage.getItem(Constants.AccessToken);

    } catch (error) {
        console.error(error);
    }
    return data;
    // isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState(),
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            const { id, email, accessToken } = action.payload;
            state.user = { id, email };
            state.token = accessToken;
            // state.isAuthenticated = true;
            localStorage.setItem(Constants.AccessToken, accessToken);
            localStorage.setItem(Constants.User, JSON.stringify(state.user));
        },
        setNewToken: (state, action: PayloadAction<{ accessToken: string; }>) => {
            state.token = action.payload.accessToken;
        },
        logout: (state,) => {
            state.user = null;
            state.token = null;
            // state.isAuthenticated = false;
            localStorage.removeItem(Constants.AccessToken);
        },
    },
});

export const { setCredentials, logout, setNewToken } = authSlice.actions;
export default authSlice.reducer;
