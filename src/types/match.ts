// src/types/match.ts
export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  avatar: string;
  skills: {name:string}[];
  bio: string;
    city: string;
    distance: number; 
      lat: number;
      long: number;
  compatibility: number;
  intent: 'study' | 'collab' | 'project' | 'mentorship';
  availability: string;
  isOnline: boolean;
  oneLiner:string,
  profilePic:string,
subjects:{name:string}[]

}

export interface MatchFilters {
  radius: number; 
  skills: string[];
  intent: string[];
  availability: string[];
}