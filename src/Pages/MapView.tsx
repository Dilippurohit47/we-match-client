import React, { useState, useEffect, useContext, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
// import 'leaflet/dist/leaflet.css';
// import 'react-leaflet-cluster/dist/styles.min.css';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// FIX: Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { AuthContext } from '@/AuthContext';
import { backendUrl } from '@/helper';
import  type { UserProfile  } from '@/types/match';

// Configure Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icon creator
const createCustomIcon = (isCurrentUser = false, isOnline = true , fullName) => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-lg ${
        isCurrentUser ? 'bg-blue-500' : isOnline ? 'bg-green-500' : 'bg-gray-400'
      }">
        <span class="text-white font-semibold capitalize">${isCurrentUser ? 'You' : fullName.split(" ")[0]}</span>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};



const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `
      <div style="
        background-color: #3b82f6;
        color: white;
        border-radius: 9999px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border: 2px solid white;
          outline: 4px;
  outline-color: rgba(0, 149, 255, 0.732);
      ">
        ${cluster.getChildCount()}
      </div>
    `,
    className: "custom-cluster-icon",
    iconSize: L.point(40, 40, true),
  });
};



// // Component to handle map clicks
// function LocationMarker() {
//   const map = useMapEvents({
//     click() {
//       // map.flyTo([37.7749, -122.4194], map.getZoom());
//     },
//   });
//   return null;
// }

const MapView = () => {
  const [currentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [radius, setRadius] = useState(5);
  const {user } = useContext(AuthContext)
  const  [loading,setLoading] = useState<boolean>(true)
  const [nearbyUsers ,setNearbyUsers] = useState<UserProfile[] | []>([])
  const [error,setError] = useState<string | null>(null)

    useEffect(() => {
    if (!user?.id) return;
    const fetchNearbyUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${backendUrl}/api/v1/user/get-nearby-users?userid=${user.id}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setNearbyUsers(data.candidates);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [user?.id]);

    const markers = useMemo(
  () =>
    nearbyUsers.map((user) => (
      <Marker
        key={user.id}
        position={[Number(user.lat), Number(user.long)]}
        icon={createCustomIcon(false, user.online, user.fullName)}
      >
        <Popup autoClose={false} closeOnClick={false}>
          <div className="p-3 min-w-[200px]">

            <div className='flex gap-3'>
              <img src={user.profilePic} alt="user-avatar" className='h-8 w-8 object-cover  rounded-4xl' />
              <div>
            <h3 className="font-bold  capitalize">{user.fullName}</h3>
          <div className='text-gray-400 text-[12px]'>{user.oneLiner}</div>
              </div>
            </div>
            <p>{user.distance} away</p>
            <button
              onClick={() => setSelectedUser(user)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send Message
            </button>
          </div>
        </Popup>
      </Marker>
    )),
  [nearbyUsers]
);



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
            <span className="text-gray-700 font-medium">Nearby Users: {nearbyUsers.length}</span>
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
            {
              user && <MapContainer
              center={[user?.lat, user?.long]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
              closePopupOnClick={false} 
                worldCopyJump={false} 
                scrollWheelZoom="center"
                  inertia={false}         // 👈 CRITICAL
                  doubleClickZoom={false}

            >
              {/* OpenStreetMap Tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Current User Location */}
              {Number.isFinite(user?.lat) && Number.isFinite(user?.long) && ( 
              <Marker
                position={[user?.lat, user?.long]}
                icon={createCustomIcon(true  , true , user.fullName)}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <h3 className="font-bold text-blue-600 text-lg">{user.city}</h3>
                    <p className="text-gray-600 mt-1">{user.city}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>📱 Sharing location</p>
                      <p>📍 Center of map view</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
              )}

              {/* Nearby Users */}
          <MarkerClusterGroup
  chunkedLoading
  maxClusterRadius={500}   // 👈 controls "nearby"
   zoomToBoundsOnClick={false}   // 👈 CRITICAL
  spiderfyOnMaxZoom={true}      // 👈 allows clicking individual users
  showCoverageOnHover={false}  
   iconCreateFunction={createClusterCustomIcon} 
>
{markers}
</MarkerClusterGroup>


              {/* Radius Circle */}
              <Circle
                center={[user.lat, user.long]}
                radius={radius * 1000}
                pathOptions={{ 
                  color: '#3B82F6', 
                  fillColor: '#3B82F6', 
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />

              {/* <LocationMarker /> */}
            </MapContainer>
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapView;