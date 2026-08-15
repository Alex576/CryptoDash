export interface AuthResponse {
    id: string;
    email: string;
    accessToken: string;
}
export interface RegisterResponse {
    isSuccess: boolean;
}
export interface LoginRequest {
    email: string;
    password?: string; // Поле опционально, если используете разные типы входа
}

export interface RegisterRequest {
    email: string;
    password?: string;
}

export interface LogoutRequest {
    id: string;
}

export interface RefreshTokenResponse {
    token: string;
}
