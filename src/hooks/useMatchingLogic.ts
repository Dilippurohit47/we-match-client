// src/hooks/useMatchingLogic.ts
import { useState, useEffect, useContext } from 'react';
import type { UserProfile, MatchFilters } from '../types/match';
import { backendUrl } from '@/helper';
import { AuthContext } from '@/AuthContext';

// Mock data - replace with your API
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Alex Chen',
    age: 24,
    avatar: '👨‍💻',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
    bio: 'Building a fintech startup. Looking for a frontend partner who loves clean code!',
      city: 'San Francisco',
      distance: 1.2,
    compatibility: 87,
    intent: 'project',
    availability: 'Weekends',
    isOnline: true
  },
];



export const useMatchingLogic = () => {
    const { user } = useContext(AuthContext);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
    const [nearbyUsers, setNearbyUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [filters, setFilters] = useState<MatchFilters>({
    radius: 5,
    skills: [],
    intent: [],
    availability: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);

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


 
  useEffect(() => {
    // Apply filters
    const filtered = nearbyUsers.filter(user => 
      user.distance <= filters.radius
    );
    console.log(filtered)
    setFilteredUsers(filtered);
    setCurrentIndex(0);
  }, [filters, nearbyUsers]);

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