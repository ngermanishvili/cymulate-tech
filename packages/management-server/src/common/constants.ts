export const APP_CONSTANTS = {
    JWT: {
        EXPIRES_IN: '1d',
        SECRET: process.env.JWT_SECRET || 'super-secret',
    },
    SALT_ROUNDS: 10,
    PORT: parseInt(process.env.PORT, 10) || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};