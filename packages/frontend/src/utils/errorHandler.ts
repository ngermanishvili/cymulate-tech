export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const handleApiError = (error: any): ApiError => {
    if (error.response) {
        return new ApiError(
            error.response.data.message || 'An error occurred',
            error.response.status,
            error.response.data.code
        );
    }
    return new ApiError('Network error');
};
