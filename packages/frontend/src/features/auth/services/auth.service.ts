import { ApiClient } from '../../../core/api/client';
import { ApiResponse } from '../../../core/types/types'
import { APP_CONSTANTS } from '../../../core/config/constants';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export class AuthService {
    constructor(private readonly api: ApiClient) { }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await this.api.post<ApiResponse<AuthResponse>>(
                APP_CONSTANTS.API.ENDPOINTS.AUTH.LOGIN,
                credentials
            );

            if (response.data.success && response.data.data) {
                this.setToken(response.data.data.access_token);
                return response.data.data;
            }

            throw new Error(response.data.error || 'Login failed');
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async register(userData: RegisterCredentials): Promise<AuthResponse> {
        try {
            const response = await this.api.post<ApiResponse<AuthResponse>>(
                APP_CONSTANTS.API.ENDPOINTS.AUTH.REGISTER,
                userData
            );

            if (response.data.success && response.data.data) {
                this.setToken(response.data.data.access_token);
                return response.data.data;
            }

            throw new Error(response.data.error || 'Registration failed');
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    logout(): void {
        localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
    }

    private setToken(token: string): void {
        localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, token);
    }

    private handleError(error: any): Error {
        console.error('Auth Error:', error);
        return new Error(
            error.response?.data?.error ||
            error.message ||
            'Authentication failed'
        );
    }
}