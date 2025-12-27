import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX: Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icon creator
const createCustomIcon = (isCurrentUser = false, isOnline = true) => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-lg ${
        isCurrentUser ? 'bg-blue-500' : isOnline ? 'bg-green-500' : 'bg-gray-400'
      }">
        <span class="text-white font-semibold">${isCurrentUser ? 'You' : 'U'}</span>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Sample user data
const users = [
  { id: 1, name: "Alex Johnson", lat: 37.7749, lng: -122.4194, online: true, distance: "0.5km" },
  { id: 2, name: "Sam Rivera", lat: 37.7740, lng: -122.4180, online: true, distance: "0.8km" },
  { id: 3, name: "Taylor Swift", lat: 37.7755, lng: -122.4170, online: false, distance: "1.2km" },
  { id: 4, name: "Jordan Lee", lat: 37.7735, lng: -122.4210, online: true, distance: "1.0km" },
  { id: 5, name: "Casey Kim", lat: 37.7760, lng: -122.4200, online: false, distance: "1.5km" },
];

// Component to handle map clicks
function LocationMarker() {
  const map = useMapEvents({
    click() {
      map.flyTo([37.7749, -122.4194], map.getZoom());
    },
  });
  return null;
}

const MapView = () => {
  const [currentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [radius, setRadius] = useState(5);
  const [isClient, setIsClient] = useState(false);

  // Fix for SSR: Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h1 className="text-3xl font-bold text-gray-800">Map View</h1>
        <p className="text-gray-600 mt-1">See nearby users in real-time</p>
      </div>

      {/* Location Radius Controls */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Location Radius</h2>
        <div className="flex flex-wrap gap-3">
          {[5, 10, 20, 50].map((km) => (
            <button
              key={km}
              onClick={() => setRadius(km)}
              className={`px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                radius === km
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Within {km}km
            </button>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Nearby Users: {users.length}</span>
            <span className="text-blue-600 font-semibold">Radius: {radius}km</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (radius / 50) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map Container - Takes 70% of width */}
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={16}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              {/* OpenStreetMap Tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Current User Location */}
              <Marker
                position={[currentLocation.lat, currentLocation.lng]}
                icon={createCustomIcon(true)}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <h3 className="font-bold text-blue-600 text-lg">Your Location</h3>
                    <p className="text-gray-600 mt-1">San Francisco, California</p>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>📱 Sharing location</p>
                      <p>📍 Center of map view</p>
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Nearby Users */}
              {users.map((user) => (
                <Marker
                  key={user.id}
                  position={[user.lat, user.lng]}
                  icon={createCustomIcon(false, user.online)}
                  eventHandlers={{
                    click: () => setSelectedUser(user),
                  }}
                >
                  <Popup>
                    <div className="p-3 min-w-[200px]">
                      <h3 className="font-bold text-gray-800">{user.name}</h3>
                      <div className="flex items-center mt-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm">{user.online ? 'Online Now' : 'Last seen 2h ago'}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{user.distance} away</p>
                      <button className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors">
                        Send Message
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Radius Circle */}
              <Circle
                center={[currentLocation.lat, currentLocation.lng]}
                radius={radius * 1000}
                pathOptions={{ 
                  color: '#3B82F6', 
                  fillColor: '#3B82F6', 
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />

              <LocationMarker />
            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapView;