export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}