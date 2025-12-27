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
import Navbar from '@/components/Navbar';

interface DesktopLayoutProps {
  currentUser: UserProfile | undefined;
  nextUsers: UserProfile[];
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  filters: any;
  updateFilters: (filters: any) => void;
  matchedFunction: () => Promise<void>;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  currentUser,
  nextUsers,
  onSwipe,
  filters,
  updateFilters,
  matchedFunction
}) => {


  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated background */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
      </div> */}
      <Navbar />


      <div className="relative h-full flex">
        {/* Sidebar */}
 

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
      {/* <Navbar /> */}
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
                  <div className="mb-8 flex gap-3 relative  w-[full] ">
                     <div className='absolute  left-[-4rem] rotate-[-15deg] h-[27rem] w-[23rem] top-[2rem] overflow-hidden z-[0]  rounded-3xl'>
                      <div
  className="
    absolute inset-0 z-[20]
    bg-black/40
    backdrop-blur-sm
    backdrop-brightness-90
  "
/>
                    <UserCard user={currentUser} isActive={true} size="lg" />
                    </div>
                    <UserCard user={currentUser} isActive={true} size="lg" />
                    <div className='absolute  left-[5rem] rotate-[15deg] h-[27rem] w-[23rem] top-[2rem] overflow-hidden z-[0]  rounded-3xl'>
                      <div
  className="
    absolute inset-0 z-[20]
    bg-black/40
    backdrop-blur-sm
    backdrop-brightness-90
  "
/>
                    <UserCard user={currentUser} isActive={true} size="lg" />
                    </div>

                  </div>
                  
                    {/* Action Buttons */}
                    <div className="w-full max-w-md ">
                      <SwipeButtons onSwipe={onSwipe} disabled={!currentUser}   matchedFunction={matchedFunction} />
                    </div>
                </>
              )}
            </div>

            {/* Right Panel - Next in line & Stats */}
            <div className="space-y-6 z-[4] ">
              {/* Next Up */}
              <div className="p-6 rounded-2xl bg-black bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-purple-400" />
                  Next in your area
                </h3>
                <div className="space-y-4 ">
                  {nextUsers.slice(0, 3).map(user => (
                    <div 
                      key={user.id}
                      className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.skills[0].name} • {user?.distance}km</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 bg-black rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
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