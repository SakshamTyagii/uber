import { useState, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocation({
        coordinates: null,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setGeolocation({
        coordinates: { latitude, longitude },
        error: null,
        isLoading: false,
      });
    };

    const error = (error: GeolocationPositionError) => {
      setGeolocation({
        coordinates: null,
        error: error.message,
        isLoading: false,
      });
    };

    // Get current position
    const watchId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
    });

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return geolocation;
};