import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Package, Utensils, Calendar, Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/ride');
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-uber overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request a ride now</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Reliable rides that arrive in minutes</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pickup Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="pickup"
                    className="input pl-10"
                    placeholder="Current location"
                    readOnly
                    value="Current location"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="destination"
                    className="input pl-10"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn btn-primary py-3 flex items-center justify-center"
                >
                  <span>Request Ride</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Our services
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ServiceCard 
                icon={<Car className="h-6 w-6" />}
                title="Ride"
                description="Get a reliable ride in minutes"
                onClick={() => navigate('/ride')}
              />
              <ServiceCard 
                icon={<Package className="h-6 w-6" />}
                title="Package"
                description="Send packages to your loved ones"
                onClick={() => {}}
              />
              <ServiceCard 
                icon={<Utensils className="h-6 w-6" />}
                title="Eats"
                description="Food delivery to your doorstep"
                onClick={() => {}}
              />
              <ServiceCard 
                icon={<Calendar className="h-6 w-6" />}
                title="Reserve"
                description="Book rides in advance"
                onClick={() => {}}
              />
            </div>
          </div>
        </motion.div>
        
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Why ride with us?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Feature 
              title="Safety First"
              description="Our commitment to safety for riders and drivers before, during, and after every trip."
            />
            <Feature 
              title="Transparent Pricing"
              description="Know the cost of your ride upfront, with no hidden fees or surprises."
            />
            <Feature 
              title="24/7 Support"
              description="Get support at any time through the app, whenever you need it."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
    onClick={onClick}
  >
    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-uber-blue mb-3">
      {icon}
    </div>
    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
  </motion.div>
);

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

export default HomePage;