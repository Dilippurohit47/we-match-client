// src/hooks/useMatchingLogic.ts
import { useState, useEffect } from 'react';
import type { UserProfile, MatchFilters } from '../types/match';

// Mock data - replace with your API
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Alex Chen',
    age: 24,
    avatar: '👨‍💻',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
    bio: 'Building a fintech startup. Looking for a frontend partner who loves clean code!',
    location: {
      city: 'San Francisco',
      distance: 1.2
    },
    compatibility: 87,
    intent: 'project',
    availability: 'Weekends',
    isOnline: true
  },
  // Add more mock users...
];

export const useMatchingLogic = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [filters, setFilters] = useState<MatchFilters>({
    radius: 5,
    skills: [],
    intent: [],
    availability: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate API call
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = users.filter(user => 
      user.location.distance <= filters.radius
    );
    setFilteredUsers(filtered);
    setCurrentIndex(0);
  }, [filters, users]);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    // Handle swipe logic
    if (direction === 'right') {
      console.log('Matched with:', filteredUsers[currentIndex]);
    }
    
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // No more users
      setCurrentIndex(0);
    }
  };

  const updateFilters = (newFilters: Partial<MatchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getCurrentUser = () => {
    return filteredUsers[currentIndex];
  };

  const getNextUsers = (count: number = 3) => {
    return filteredUsers.slice(currentIndex + 1, currentIndex + 1 + count);
  };

  return {
    users: filteredUsers,
    currentUser: getCurrentUser(),
    nextUsers: getNextUsers(),
    currentIndex,
    totalUsers: filteredUsers.length,
    filters,
    handleSwipe,
    updateFilters,
    hasMoreUsers: currentIndex < filteredUsers.length - 1
  };
};