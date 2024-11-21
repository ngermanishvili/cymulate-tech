import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiClient {
    private axiosInstance: AxiosInstance;
    private static instance: ApiClient;

    private constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient(
                import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
            );
        }
        return ApiClient.instance;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.get<T>(url, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post<T>(url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete<T>(url, config);
    }
}

export const apiClient = ApiClient.getInstance();