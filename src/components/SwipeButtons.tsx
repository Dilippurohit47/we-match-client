// src/components/SwipeButtons.tsx
import React from 'react';
import { X, Heart, Star, Info } from 'lucide-react';

interface SwipeButtonsProps {
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  disabled?: boolean;
}

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ onSwipe, disabled = false }) => {
  const buttonClasses = `p-4 rounded-full shadow-lg transition-all duration-200 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`;

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Pass Button */}
      <button
        disabled={disabled}
        onClick={() => onSwipe('left')}
        className={`
          ${buttonClasses}
          bg-gradient-to-r from-blue-500 to-cyan-500
          hover:shadow-blue-500/30
        `}
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* More Info */}
      <button
        disabled={disabled}
        onClick={() => onSwipe('up')}
        className={`
          ${buttonClasses}
          bg-gradient-to-r from-gray-600 to-gray-700
          hover:shadow-gray-500/30
        `}
      >
        <Info className="w-6 h-6 text-white" />
      </button>

      {/* Super Like */}
      <button
        disabled={disabled}
        onClick={() => onSwipe('down')}
        className={`
          ${buttonClasses}
          bg-gradient-to-r from-amber-500 to-yellow-500
          hover:shadow-amber-500/30
        `}
      >
        <Star className="w-6 h-6 text-white" />
      </button>

      {/* Like Button */}
      <button
        disabled={disabled}
        onClick={() => onSwipe('right')}
        className={`
          ${buttonClasses}
          bg-gradient-to-r from-pink-500 to-rose-500
          hover:shadow-pink-500/30
        `}
      >
        <Heart className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default SwipeButtons;