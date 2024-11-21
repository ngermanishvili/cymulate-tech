export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: process.env.MONGODB_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'super-secret',
        expiresIn: '1d',
    },
    email: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT, 10) || 587,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    backend: {
        url: process.env.BACKEND_URL || 'http://localhost:3000',
    }
});