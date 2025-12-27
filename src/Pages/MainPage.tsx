// src/pages/MainPage.tsx
import React, { useEffect } from 'react';
import { useMatchingLogic } from '../hooks/useMatchingLogic';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import { backendUrl } from '../helper';
import { toast } from 'react-toastify';

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

const matchedFunction = async()=>{
try {
  if(!currentUser.id) return
  const response = await fetch(`${backendUrl}/api/v1/match/user-matched`,{
    method:"POST",
    body:JSON.stringify({matchedUserId:currentUser.id}),
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    }
  })
      const data = await response.json(); // 🔥 read body ONCE
      console.log(data)
   if (!response.ok) {
      toast.error(data.message || data.error  || "Something went wrong", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    toast.success(data.message, {
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  } catch (error) {
    console.log("network error", error);
    toast.error("Network error", { autoClose: 1000 });
  }
};
  return isMobile ? (
    
    <MobileLayout
      currentUser={currentUser}
      nextUsers={nextUsers}
      onSwipe={handleSwipe}
      filters={filters}
      updateFilters={updateFilters}
      matchedFunction={matchedFunction}
    />
  ) : (
    <DesktopLayout
      currentUser={currentUser}
      nextUsers={nextUsers}
      onSwipe={handleSwipe}
      filters={filters}
      updateFilters={updateFilters}
      matchedFunction={matchedFunction}
    />
  );
};

export default MainPage;