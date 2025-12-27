// src/types/match.ts
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  skills: string[];
  bio: string;
    city: string;
    distance: number; // in km
    coordinates?: {
      lat: number;
      lng: number;
    };
  compatibility: number; // 0-100
  intent: 'study' | 'collab' | 'project' | 'mentorship';
  availability: string;
  isOnline: boolean;
}

export interface MatchFilters {
  radius: number; // in km
  skills: string[];
  intent: string[];
  availability: string[];
}