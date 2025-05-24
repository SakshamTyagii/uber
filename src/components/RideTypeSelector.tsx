import React from 'react';
import { Car, Truck, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface RideType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  eta: string;
}

interface RideTypeSelectorProps {
  onSelect: (rideType: RideType) => void;
  selectedRideId?: string;
}

const rideTypes: RideType[] = [
  {
    id: 'economy',
    name: 'UberX',
    description: 'Affordable, everyday rides',
    icon: <Car className="h-6 w-6" />,
    price: 24.5,
    eta: '3 min',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Newer cars with extra legroom',
    icon: <Users className="h-6 w-6" />,
    price: 32.75,
    eta: '5 min',
  },
  {
    id: 'xl',
    name: 'UberXL',
    description: 'Affordable rides for groups up to 6',
    icon: <Truck className="h-6 w-6" />,
    price: 39.25,
    eta: '4 min',
  },
  {
    id: 'reserve',
    name: 'Reserve',
    description: 'Book in advance for peace of mind',
    icon: <Clock className="h-6 w-6" />,
    price: 29.99,
    eta: 'Book ahead',
  },
];

const RideTypeSelector: React.FC<RideTypeSelectorProps> = ({
  onSelect,
  selectedRideId = 'economy',
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Choose a ride</h3>
      <div className="space-y-2">
        {rideTypes.map((rideType) => (
          <motion.div
            key={rideType.id}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-lg border-2 ${
              selectedRideId === rideType.id
                ? 'border-uber-blue dark:border-uber-blue'
                : 'border-gray-200 dark:border-gray-700'
            } p-4 cursor-pointer transition-all duration-200`}
            onClick={() => onSelect(rideType)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  selectedRideId === rideType.id
                    ? 'bg-uber-blue text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {rideType.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{rideType.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{rideType.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {rideType.eta}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-900 dark:text-white">
                  ${rideType.price.toFixed(2)}
                </span>
              </div>
            </div>

            {selectedRideId === rideType.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -right-1 -top-1 bg-uber-blue text-white rounded-full p-1"
              >
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RideTypeSelector;