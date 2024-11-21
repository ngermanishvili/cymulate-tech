import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { login } from '../store/auth.slice';
import { validateForm, loginSchema } from '@/utils/validation';

interface LoginFormData {
    email: string;
    password: string;
}
//? for validation

export type ValidationErrors = {
    [key: string]: string | undefined;
};

export const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error: authError } = useAppSelector(state => state.auth);
    const [errors, setErrors] = React.useState<ValidationErrors>({});

    const [formData, setFormData] = React.useState<LoginFormData>({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(loginSchema, formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await dispatch(login(formData)).unwrap();
                navigate('/dashboard');
            } catch (err) {
                console.error('Login failed:', err);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        //! Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl text-black font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {authError && (
                        <div className="text-red-500 text-sm">{authError}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 text-white rounded ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div>
                    <p className="text-center mt-4 text-gray-500">
                        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};