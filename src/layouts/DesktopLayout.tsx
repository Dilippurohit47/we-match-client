// src/layouts/DesktopLayout.tsx
import React, { useState } from 'react';
import type { UserProfile } from '../types/match';
import UserCard from '../components/UserCard';
import SwipeButtons from '../components/SwipeButtons';
import { 
  Home, 
  MapPin, 
  MessageCircle, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  Filter,
  Globe,
  Bell
} from 'lucide-react';

interface DesktopLayoutProps {
  currentUser: UserProfile | undefined;
  nextUsers: UserProfile[];
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  filters: any;
  updateFilters: (filters: any) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  currentUser,
  nextUsers,
  onSwipe,
  filters,
  updateFilters
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Discover', active: true },
    { icon: <MapPin className="w-5 h-5" />, label: 'Map View' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Messages', badge: 3 },
    { icon: <Users className="w-5 h-5" />, label: 'Matches' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Projects' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
      </div>

      <div className="relative h-full flex">
        {/* Sidebar */}
        <div className={`
          relative h-full bg-gray-900/80 backdrop-blur-sm border-r border-gray-800/50
          transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}
        `}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                <Globe className="w-6 h-6" />
              </div>
              {sidebarOpen && (
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  WeMatch
                </h1>
              )}
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all
                    ${item.active 
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  {item.icon}
                  {sidebarOpen && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>

            {/* Location Filter */}
            {sidebarOpen && (
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Location Radius</span>
                </div>
                <div className="space-y-2">
                  {[5, 10, 20, 50].map(km => (
                    <button
                      key={km}
                      onClick={() => updateFilters({ radius: km })}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                        ${filters.radius === km
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'hover:bg-gray-700/50 text-white'
                        }
                      `}
                    >
                      Within {km}km
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="px-6 py-3  border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Find Your Hustle Crew</h2>
                <p className="text-gray-400">Connect with skilled people nearby</p>
              </div>
              
              <div className="flex items-center text-white gap-4">
                <button className="p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                  <Bell className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card Area */}
          <div className="flex-1 p-6 grid grid-cols-3 gap-6">
            {/* Left Panel - User Details */}
            <div className="col-span-2 flex flex-col items-center justify-center">
              {!currentUser ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-2">No more hustlers nearby</h3>
                  <p className="text-gray-400">Increase your radius or try different filters</p>
                </div>
              ) : (
                <>
                  {/* Main Card */}
                  <div className="mb-8">
                    <UserCard user={currentUser} isActive={true} size="lg" />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="w-full max-w-md">
                    <SwipeButtons onSwipe={onSwipe} disabled={!currentUser} />
                  </div>
                </>
              )}
            </div>

            {/* Right Panel - Next in line & Stats */}
            <div className="space-y-6">
              {/* Next Up */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-purple-400" />
                  Next in your area
                </h3>
                <div className="space-y-4">
                  {nextUsers.slice(0, 3).map(user => (
                    <div 
                      key={user.id}
                      className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.skills[0]} • {user.location.distance}km</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
                <h3 className="font-bold mb-4 text-white">Today's Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profiles viewed</span>
                    <span className="font-bold text-gray-300">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Matches made</span>
                    <span className="font-bold text-green-400">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Nearby hustlers</span>
                    <span className="font-bold text-purple-400">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;