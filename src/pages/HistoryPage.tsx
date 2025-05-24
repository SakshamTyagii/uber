import React, { useState } from 'react';
import { Car, ArrowRight, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface Ride {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  amount: number;
  status: 'completed' | 'cancelled';
  driverName?: string;
  driverRating?: number;
  carModel?: string;
}

// Mock ride history data
const rideHistory: Ride[] = [
  {
    id: '1',
    date: '2023-05-15T14:30:00',
    pickup: 'Times Square',
    destination: 'Empire State Building',
    amount: 24.50,
    status: 'completed',
    driverName: 'John D.',
    driverRating: 4.8,
    carModel: 'Tesla Model Y',
  },
  {
    id: '2',
    date: '2023-05-10T09:15:00',
    pickup: 'Central Park',
    destination: 'Brooklyn Bridge',
    amount: 32.75,
    status: 'completed',
    driverName: 'Sarah M.',
    driverRating: 4.9,
    carModel: 'Toyota Camry',
  },
  {
    id: '3',
    date: '2023-05-05T19:45:00',
    pickup: 'Grand Central Terminal',
    destination: 'JFK Airport',
    amount: 75.20,
    status: 'completed',
    driverName: 'Alex P.',
    driverRating: 4.7,
    carModel: 'Honda Accord',
  },
  {
    id: '4',
    date: '2023-04-28T12:00:00',
    pickup: 'Wall Street',
    destination: 'Chinatown',
    amount: 18.90,
    status: 'cancelled',
  },
];

const HistoryPage: React.FC = () => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');
  
  const filteredRides = rideHistory.filter(ride => {
    if (filter === 'all') return true;
    return ride.status === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-uber overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your ride history</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View all your past rides</p>
            
            <div className="mt-4 flex space-x-2">
              <FilterButton 
                isActive={filter === 'all'} 
                onClick={() => setFilter('all')}
                label="All"
              />
              <FilterButton 
                isActive={filter === 'completed'} 
                onClick={() => setFilter('completed')}
                label="Completed"
              />
              <FilterButton 
                isActive={filter === 'cancelled'} 
                onClick={() => setFilter('cancelled')}
                label="Cancelled"
              />
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRides.length > 0 ? (
              filteredRides.map(ride => (
                <RideHistoryItem 
                  key={ride.id} 
                  ride={ride} 
                  onClick={() => setSelectedRide(ride)} 
                  isSelected={selectedRide?.id === ride.id}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No rides found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You don't have any {filter !== 'all' ? filter : ''} rides in your history.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {selectedRide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-uber overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Ride details
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedRide.status === 'completed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {selectedRide.status.charAt(0).toUpperCase() + selectedRide.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(selectedRide.date)}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="min-w-[24px] flex flex-col items-center mr-3">
                      <div className="h-6 w-6 rounded-full bg-uber-blue flex items-center justify-center text-white text-xs">A</div>
                      <div className="h-12 border-l border-dashed border-gray-300 dark:border-gray-600 my-1"></div>
                      <div className="h-6 w-6 rounded-full bg-uber-green flex items-center justify-center text-white text-xs">B</div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pickup</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedRide.pickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Destination</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedRide.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Fare</span>
                  <span className="font-medium text-gray-900 dark:text-white">${selectedRide.amount.toFixed(2)}</span>
                </div>
                
                {selectedRide.status === 'completed' && selectedRide.driverName && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                        <Car className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedRide.driverName}</p>
                        {selectedRide.carModel && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{selectedRide.carModel}</p>
                        )}
                        {selectedRide.driverRating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{selectedRide.driverRating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-2 flex space-x-3">
                  <button className="flex-1 btn btn-secondary py-2.5">
                    Get help
                  </button>
                  {selectedRide.status === 'completed' && (
                    <button className="flex-1 btn btn-primary py-2.5">
                      Book again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-uber-blue text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    {label}
  </button>
);

interface RideHistoryItemProps {
  ride: Ride;
  onClick: () => void;
  isSelected: boolean;
}

const RideHistoryItem: React.FC<RideHistoryItemProps> = ({ ride, onClick, isSelected }) => (
  <motion.div
    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
    whileTap={{ scale: 0.995 }}
    onClick={onClick}
    className={`p-4 cursor-pointer ${isSelected ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <Car className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <p className="font-medium text-gray-900 dark:text-white">{ride.pickup}</p>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <p className="font-medium text-gray-900 dark:text-white">{ride.destination}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(ride.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900 dark:text-white">
          ${ride.amount.toFixed(2)}
        </p>
        <span className={`text-xs ${
          ride.status === 'completed'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </span>
      </div>
    </div>
  </motion.div>
);

export default HistoryPage;