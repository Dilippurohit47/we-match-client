import { Bell, Filter } from 'lucide-react'
import DropDown from './DropDown'
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const  {isLoggedIn} = useContext(AuthContext)
  return     <div className="px-6 py-3  border-b  border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Find Your Hustle Crew</h2>
                <p className="text-gray-400">Connect with skilled people nearby</p>
              </div>
              
              <div className="flex items-center text-white gap-4">
                <button className="p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                  <Bell className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
                >
                  <Filter className="w-5 h-5" />
                </button>
                {
                  isLoggedIn ? <DropDown  /> : <button className='px-3 py-2 bg-purple-600 text-white'>
                    Login
                  </button>   
                }              </div>
            </div>
          </div>

}

export default Navbar
