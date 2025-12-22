// src/pages/MainPage.tsx
import React, { useEffect } from 'react';
import { useMatchingLogic } from '../hooks/useMatchingLogic';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';

const MainPage: React.FC = () => {
  const {
    currentUser,
    nextUsers,
    filters,
    handleSwipe,
    updateFilters,
    hasMoreUsers
  } = useMatchingLogic();

  // Detect mobile/desktop
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard shortcuts for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasMoreUsers) return;

      switch(e.key) {
        case 'ArrowLeft':
          handleSwipe('left');
          break;
        case 'ArrowRight':
          handleSwipe('right');
          break;
        case 'ArrowUp':
          handleSwipe('up');
          break;
        case 'ArrowDown':
          handleSwipe('down');
          break;
        case ' ':
          handleSwipe('right'); // Space for like
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSwipe, hasMoreUsers, isMobile]);

  return isMobile ? (
    <MobileLayout
      currentUser={currentUser}
      nextUsers={nextUsers}
      onSwipe={handleSwipe}
      filters={filters}
      updateFilters={updateFilters}
    />
  ) : (
    <DesktopLayout
      currentUser={currentUser}
      nextUsers={nextUsers}
      onSwipe={handleSwipe}
      filters={filters}
      updateFilters={updateFilters}
    />
  );
};

export default MainPage;