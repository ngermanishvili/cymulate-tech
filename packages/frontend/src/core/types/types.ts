export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    total: number;
    page: number;
    limit: number;
}