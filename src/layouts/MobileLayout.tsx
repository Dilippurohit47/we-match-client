// src/layouts/MobileLayout.tsx
import React from 'react';
import type { UserProfile } from '../types/match';
import UserCard from '../components/UserCard';
import SwipeButtons from '../components/SwipeButtons';
import { MapPin, Users, MessageCircle, User, Settings, Filter } from 'lucide-react';

interface MobileLayoutProps {
  currentUser: UserProfile | undefined;
  nextUsers: UserProfile[];
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  filters: any;
  updateFilters: (filters: any) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  currentUser,
  nextUsers,
  onSwipe,
  filters,
  updateFilters
}) => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold">Nearby Hustlers</h2>
              <p className="text-xs text-gray-400">{filters.radius}km radius</p>
            </div>
          </div>
          
          <button className="p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content - Card Stack */}
      <div className="relative z-10 h-[70vh] flex items-center justify-center">
        {!currentUser ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-2">No more hustlers</h3>
            <p className="text-gray-400">Increase your radius or check back later!</p>
          </div>
        ) : (
          <>
            {/* Next cards (peeking from behind) */}
            {nextUsers.slice(0, 2).map((user, index) => (
              <div 
                key={user.id}
                className="absolute"
                style={{
                  transform: `translateY(${(index + 1) * 10}px) scale(${0.9 - index * 0.1})`,
                  zIndex: 10 - index
                }}
              >
                <UserCard user={user} isActive={false} size="md" />
              </div>
            ))}

            {/* Current card */}
            <div className="absolute z-20">
              <UserCard user={currentUser} isActive={true} size="lg" />
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-6">
        <SwipeButtons 
          onSwipe={onSwipe} 
          disabled={!currentUser}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-gray-800/50 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center">
            <MapPin className="w-6 h-6 text-purple-400 mb-1" />
            <span className="text-xs">Discover</span>
          </button>
          
          <button className="flex flex-col items-center">
            <Users className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs">Matches</span>
          </button>
          
          <button className="flex flex-col items-center">
            <MessageCircle className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs">Chat</span>
          </button>
          
          <button className="flex flex-col items-center">
            <User className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;