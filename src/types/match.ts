// src/types/match.ts
export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  avatar: string;
  skills: string[];
  bio: string;
    city: string;
    distance: number; // in km
      lat: number;
      long: number;
  compatibility: number; // 0-100
  intent: 'study' | 'collab' | 'project' | 'mentorship';
  availability: string;
  isOnline: boolean;
  oneLiner:string,
  profilePic:string,
}

export interface MatchFilters {
  radius: number; // in km
  skills: string[];
  intent: string[];
  availability: string[];
}