import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-uber-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-uber p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 text-uber-blue mb-6">
          <Map className="h-8 w-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Page not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link 
            to="/"
            className="flex-1 btn btn-primary py-3 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex-1 btn btn-secondary py-3"
          >
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;