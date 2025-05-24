import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Car } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-uber-black">
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-uber-black dark:text-white" />
          <span className="text-2xl font-bold text-uber-black dark:text-white">UberClone</span>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} UberClone. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;