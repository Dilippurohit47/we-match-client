

// src/layouts/DesktopLayout.tsx
import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  MessageCircle, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  Globe,
  PanelRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useMatchingLogic } from '@/hooks/useMatchingLogic';
import {  Outlet } from "react-router-dom";
// import { GoSidebarExpand } from "react-icons/go";

const SidebarLayout = () => {

      const [sidebarOpen, setSidebarOpen] = useState(true);
        const {
          currentUser,
          nextUsers,
          filters,
          handleSwipe,
          updateFilters,
          hasMoreUsers
        } = useMatchingLogic();

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Discover', active: true , href:"/matching"},
    { icon: <MapPin className="w-5 h-5" />, label: 'Map View' ,href:"/map" },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Messages', badge: 3 ,href:"/chat-box" },
    { icon: <Users className="w-5 h-5" />, label: 'Matches' ,href:"/matches" },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout' },
  ];
  return (
    <div>

      <div className=' flex  h-[100vh] w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 '>
<div className={` ${sidebarOpen ? "mr-[18vw]" : "mr-[0]"}    transition-all duration-300  `}   />
             <div className={`
          fixed    h-full  bg-black  backdrop-blur-sm border-r border-gray-800/50
          transition-all duration-300 ${sidebarOpen ? 'w-[18vw]' : 'w-20'}
        `}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                <Globe className="w-6 h-6" />
              </div>
              {sidebarOpen && (
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  WeMatch
                </h1>
              )}
            </div>

            <nav className={`space-y-2 ${sidebarOpen ? "w-full" : "w-fit"}   flex  flex-col justify-center items-center `}>
              {sidebarItems.map((item, index) => (
                <a href={item.href}
                  key={index}
                  className={`
                    w-full flex cursor-pointer items-center gap-3 p-3 rounded-xl transition-all
                    ${item.active 
                      ? 'bg-gradient-to-r w-full from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                     <div className="w-6 h-6 flex items-center justify-center">
      {item.icon}
    </div>
                  {sidebarOpen && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300">
                          {item.badge}
                        </span>
                      )}
                      </>
                  )}
                </a>
                    
              ))}
          <div  className={`w-full flex cursor-pointer items-center gap-3 p-3 rounded-xl transition-all text-gray-400 hover:text-white hover:bg-gray-800/50'
                  `} onClick={()=>setSidebarOpen((prev) =>!prev)}> <div className='w-6 h-6'>
                    
                    <PanelRight/>  </div> {sidebarOpen ? "Close" :""}</div>
                  </nav>

            {/* Location Filter */}
            {sidebarOpen && (
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Location Radius</span>
                </div>
                <div className="space-y-2">
                  {[5, 10, 20, 50].map(km => (
                    <button
                      key={km}
                      onClick={() => updateFilters({ radius: km })}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                        ${filters.radius === km
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'hover:bg-gray-700/50 text-white'
                        }
                      `}
                    >
                      Within {km}km
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=' w-full'>
 <Outlet />
</div>

        </div>
    </div>
  )
}

export default SidebarLayout
