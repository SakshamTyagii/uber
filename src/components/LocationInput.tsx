import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

interface LocationInputProps {
  placeholder: string;
  icon?: React.ReactNode;
  onLocationSelect: (location: Location) => void;
  value?: string;
  readOnly?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  icon = <MapPin className="h-5 w-5 text-gray-400" />,
  onLocationSelect,
  value,
  readOnly = false,
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && !autocompleteService.current) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      const mapDiv = document.createElement('div');
      placesService.current = new google.maps.places.PlacesService(mapDiv);
    }
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: 'us' },
          types: ['geocode', 'establishment'],
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (prediction: google.maps.places.AutocompletePrediction) => {
    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: ['name', 'formatted_address', 'geometry'],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry?.location) {
            const location: Location = {
              id: prediction.place_id,
              name: place.name || prediction.structured_formatting.main_text,
              address: place.formatted_address || prediction.structured_formatting.secondary_text,
              coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            };
            setInputValue(location.name);
            onLocationSelect(location);
            setPredictions([]);
          }
        }
      );
    }
  };

  const handleClear = () => {
    setInputValue('');
    setPredictions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle click outside to close predictions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setPredictions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInput}
          className="input pl-10 pr-10"
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {inputValue && !readOnly && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </button>
        )}
      </div>

      {predictions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md max-h-60 overflow-y-auto"
        >
          <ul className="py-1">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() => handlePredictionClick(prediction)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {prediction.structured_formatting.main_text}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {prediction.structured_formatting.secondary_text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationInput;