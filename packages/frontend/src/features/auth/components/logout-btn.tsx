import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md w-full p-4"
        >
            Logout
        </button>
    );
};