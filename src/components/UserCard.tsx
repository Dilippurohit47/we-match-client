// src/components/UserCard.tsx
import React from 'react';
import  type { UserProfile } from '../types/match';
import { MapPin, Users, Zap } from 'lucide-react';

interface UserCardProps {
  user: UserProfile;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onCardClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isActive = true,
  size = 'md',
  onCardClick 
}) => {
  const sizeClasses = {
    sm: 'w-64 h-80',
    md: 'w-80 h-96',
    lg: 'w-96 h-[500px]'
  };

  const getIntentIcon = (intent: string) => {
    switch(intent) {
      case 'study': return '📚';
      case 'collab': return '🤝';
      case 'project': return '🚀';
      case 'mentorship': return '🎯';
      default: return '💼';
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'from-amber-400 to-yellow-500';
    if (score >= 75) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-blue-400 to-cyan-500';
    return 'from-gray-400 to-gray-500';
  };
  return (
    <div 
      className={`
        ${sizeClasses[size]}
        relative rounded-3xl overflow-hidden
        bg-gradient-to-br from-gray-800/90 to-gray-900/90
        backdrop-blur-sm border border-white/10
        shadow-2xl transition-all duration-300
        ${isActive ? 'cursor-grab active:cursor-grabbing' : 'opacity-60'}
        hover:shadow-purple-500/20 hover:border-purple-500/30
        ${isActive ? 'scale-100' : 'scale-90'}
        z-[5] shadow-2xl
      `}
      onClick={onCardClick}
    >
      {/* Online Status */}
      {user?.isOnline && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-300">Online</span>
          </div>
        </div>
      )}

      {/* Compatibility Score */}
      <div className={`absolute top-4 left-4 z-10`}>
        <div className={`
          px-3 py-1 rounded-full font-bold text-sm
          bg-gradient-to-r ${getCompatibilityColor(user?.compatibility)} 
          text-white shadow-lg
        `}>
          {user.compatibility}% match
        </div>
      </div>

      {/* Gradient Avatar */}
      <div className="relative h-2/5 bg-gradient-to-br from-purple-600/30 to-pink-600/30">
        <div className="absolute overflow-hidden inset-0 flex items-center justify-center">
          <img className="object-cover" src={user?.profilePic}  />
          {/* Pulsing ring for active card */}
          {isActive && (
            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-3xl animate-ping"></div>
          )}
        </div>
        
        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-sm text-white">{user?.distance}km away</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <div className="text-2xl font-bold mb-1  flex justify-between  text-white"><div>{user?.fullName}</div> <div>{user?.age} </div></div>
          <div className='text-zinc-400  leading-5 transform -translate-y-[5.5px]'>
  {user.profession}
</div>
          <div className="flex items-center  gap-2 text-gray-400">
            <span className="text-sm flex items-center ">{getIntentIcon(user.intent)} {user.oneLiner}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-200 font-semibold">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 text-white py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm"
              >
                {skill?.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 mb-4 line-clamp-2">{user.bio}</p>

        {/* Availability */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            {/* <Clock className="w-4 h-4" /> */}
            {/* <span>{user.availability}</span> */}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className='text-zinc-300'>{user.city} , {user.country} </span>
          </div>
        </div>
      </div>

      {/* Glow effect for active card */}
      {isActive && (
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
      )}
    </div>
  );
};

export default UserCard;