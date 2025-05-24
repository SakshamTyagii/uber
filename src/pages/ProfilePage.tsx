import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, Shield, CreditCard, Key, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  if (!user) return null;

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-uber overflow-hidden">
          <div className="p-8 flex flex-col items-center border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <User size={40} />
              </div>
              <button className="absolute bottom-0 right-0 bg-uber-blue text-white p-2 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <TabButton 
              isActive={activeTab === 'account'} 
              onClick={() => setActiveTab('account')}
              icon={<User className="w-5 h-5" />}
              label="Account"
            />
            <TabButton 
              isActive={activeTab === 'payment'} 
              onClick={() => setActiveTab('payment')}
              icon={<CreditCard className="w-5 h-5" />}
              label="Payment"
            />
            <TabButton 
              isActive={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
              icon={<Shield className="w-5 h-5" />}
              label="Security"
            />
          </div>
          
          <div className="p-6">
            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Account Information
                </h3>
                
                <ProfileField 
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  label="Full name"
                  value={user.name}
                />
                
                <ProfileField 
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                  label="Email address"
                  value={user.email}
                />
                
                <ProfileField 
                  icon={<Phone className="h-5 w-5 text-gray-400" />}
                  label="Phone number"
                  value={user.phone || 'Not added'}
                  isActionable={!user.phone}
                  actionLabel="Add phone"
                />
                
                <div className="pt-4">
                  <button
                    onClick={logout}
                    className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment Methods
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-sm text-uber-blue hover:text-blue-700">
                    Edit
                  </button>
                </div>
                
                <button className="btn btn-secondary w-full mt-4">
                  Add payment method
                </button>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Security Settings
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Password</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <button className="btn btn-secondary">
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Two-factor authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Not enabled</p>
                      </div>
                    </div>
                    <button className="btn btn-secondary">
                      Enable
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
      isActive
        ? 'text-uber-blue border-b-2 border-uber-blue'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </button>
);

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isActionable?: boolean;
  actionLabel?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon,
  label,
  value,
  isActionable = false,
  actionLabel = 'Edit',
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
    <button className="text-sm text-uber-blue hover:text-blue-700">
      {actionLabel}
    </button>
  </div>
);

export default ProfilePage;