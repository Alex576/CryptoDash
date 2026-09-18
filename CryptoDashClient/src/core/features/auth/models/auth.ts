export interface AuthResponse {
    id: string;
    email: string;
    accessToken: string;
}
// export interface RegisterResponse {
//     isSuccess: boolean;
// }
export interface LoginRequest {
    login: string;
    password: string;
}

export interface RegisterRequest {
    login: string;
    password: string;
}

export interface LogoutRequest {
    id: string;
}

export interface RefreshTokenResponse {
    token: string;
}
