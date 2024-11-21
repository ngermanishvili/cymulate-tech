import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/store/store';
import { LoginForm } from './features/auth/components/login-form';
import RegisterForm from './features/auth/components/register-form';
import { Dashboard } from './pages/dashboard';
import { DashboardLayout } from './layouts/dashbord-layout';
import { PhishingDashboard } from './features/phishing/components/phishing-dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<PhishingDashboard />} />
            </Route>
          </Route>

          {/* 404 route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
