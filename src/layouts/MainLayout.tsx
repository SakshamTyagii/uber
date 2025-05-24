import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Car, Home, Map, User, History, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const MainLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-uber-black">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-uber-black dark:text-white" />
                <span className="text-xl font-bold text-uber-black dark:text-white">UberClone</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-uber-black" />
                )}
              </button>
              <nav className="ml-6 flex space-x-8">
                <NavLink to="/" isActive={isActive('/')} icon={<Home size={20} />} label="Home" />
                <NavLink to="/ride" isActive={isActive('/ride')} icon={<Map size={20} />} label="Ride" />
                <NavLink to="/history" isActive={isActive('/history')} icon={<History size={20} />} label="History" />
                <NavLink to="/profile" isActive={isActive('/profile')} icon={<User size={20} />} label="Profile" />
              </nav>
            </div>
            
            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" isActive={isActive('/')} icon={<Home size={20} />} label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink to="/ride" isActive={isActive('/ride')} icon={<Map size={20} />} label="Ride" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink to="/history" isActive={isActive('/history')} icon={<History size={20} />} label="History" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink to="/profile" isActive={isActive('/profile')} icon={<User size={20} />} label="Profile" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-600 dark:text-gray-300">Theme</span>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-uber-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, icon, label }) => (
  <Link
    to={to}
    className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActive
        ? 'border-uber-blue text-uber-blue dark:border-uber-blue dark:text-uber-blue'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-700'
    }`}
  >
    <span className="mr-1">{icon}</span>
    {label}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, icon, label, onClick }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? 'bg-uber-blue bg-opacity-10 text-uber-blue dark:bg-opacity-20'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </Link>
);

export default MainLayout;