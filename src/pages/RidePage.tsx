import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Map from '../components/Map';
import LocationInput from '../components/LocationInput';
import RideTypeSelector from '../components/RideTypeSelector';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import { useGeolocation } from '../hooks/useGeolocation';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

interface RideType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  eta: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  last4?: string;
}

const RidePage: React.FC = () => {
  const navigate = useNavigate();
  const { coordinates } = useGeolocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [selectedRideType, setSelectedRideType] = useState<RideType | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Set initial pickup location from geolocation
  useEffect(() => {
    if (coordinates) {
      setPickup({
        id: 'current',
        name: 'Current Location',
        address: 'Using GPS',
        coordinates: [coordinates.longitude, coordinates.latitude],
      });
    }
  }, [coordinates]);

  const handlePickupSelect = (location: Location) => {
    setPickup(location);
  };

  const handleDestinationSelect = (location: Location) => {
    setDestination(location);
    if (pickup) {
      setCurrentStep(2);
    }
  };

  const handleRideTypeSelect = (rideType: RideType) => {
    setSelectedRideType(rideType);
    setCurrentStep(3);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleBookRide = async () => {
    if (!pickup || !destination || !selectedRideType || !selectedPaymentMethod) return;
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="h-[60vh] md:h-[70vh] relative">
        <Map
          initialCenter={pickup?.coordinates || [-74.006, 40.7128]}
          showPickupMarker={!!pickup}
          showDestinationMarker={!!destination}
          pickupCoordinates={pickup?.coordinates}
          destinationCoordinates={destination?.coordinates}
        />
        
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl -mt-8 relative z-10 shadow-lg">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Where are you going?
                </h2>
                
                <div>
                  <LocationInput
                    placeholder="Pickup location"
                    value={pickup?.name || ''}
                    onLocationSelect={handlePickupSelect}
                  />
                </div>
                
                <div>
                  <LocationInput
                    placeholder="Enter destination"
                    onLocationSelect={handleDestinationSelect}
                  />
                </div>
                
                {pickup && destination && (
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full btn btn-primary py-3"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RideTypeSelector
                  onSelect={handleRideTypeSelect}
                  selectedRideId={selectedRideType?.id}
                />
              </motion.div>
            )}
            
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Trip details
                  </h2>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {selectedRideType?.eta || '5 min'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                      <p className="font-medium text-gray-900 dark:text-white">{pickup?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                      <p className="font-medium text-gray-900 dark:text-white">{destination?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ride type</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRideType?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-medium text-gray-900 dark:text-white">${selectedRideType?.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <PaymentMethodSelector
                  onSelect={handlePaymentMethodSelect}
                  selectedMethodId={selectedPaymentMethod?.id}
                />
                
                <div className="pt-2">
                  <button
                    onClick={handleBookRide}
                    disabled={!selectedPaymentMethod || isBooking || bookingSuccess}
                    className="w-full btn btn-primary py-3 flex items-center justify-center"
                  >
                    {isBooking ? (
                      'Booking your ride...'
                    ) : bookingSuccess ? (
                      'Ride booked successfully!'
                    ) : (
                      <>
                        <span>Book {selectedRideType?.name}</span>
                        <CreditCard className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RidePage;