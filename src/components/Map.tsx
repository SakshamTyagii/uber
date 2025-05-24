import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  showPickupMarker?: boolean;
  showDestinationMarker?: boolean;
  pickupCoordinates?: { lat: number; lng: number };
  destinationCoordinates?: { lat: number; lng: number };
  onMapClick?: (location: google.maps.LatLngLiteral) => void;
}

const Map: React.FC<MapProps> = ({
  initialCenter = { lat: 40.7128, lng: -74.006 }, // New York by default
  initialZoom = 12,
  showPickupMarker = false,
  showDestinationMarker = false,
  pickupCoordinates,
  destinationCoordinates,
  onMapClick,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: ['places'],
  });

  const mapRef = useRef<google.maps.Map>();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
    setMap(map);
  };

  useEffect(() => {
    if (map && pickupCoordinates && destinationCoordinates) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupCoordinates);
      bounds.extend(destinationCoordinates);
      map.fitBounds(bounds);
    }
  }, [map, pickupCoordinates, destinationCoordinates]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-uber-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      zoom={initialZoom}
      center={initialCenter}
      mapContainerClassName="w-full h-full rounded-lg"
      options={{
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#7c93a3' }],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#d6d6d6' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#0099dd' }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      }}
      onLoad={onLoad}
      onClick={(e) => onMapClick && e.latLng && onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
    >
      {showPickupMarker && pickupCoordinates && (
        <Marker
          position={pickupCoordinates}
          icon={{
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzI3NkVGMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
      )}
      {showDestinationMarker && destinationCoordinates && (
        <Marker
          position={destinationCoordinates}
          icon={{
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzA2QzE2NyIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;