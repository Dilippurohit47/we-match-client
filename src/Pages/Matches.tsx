import React, { useEffect, useState } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Users, 
  Filter, 
  Search, 
  Sparkles,
  CheckCircle,
  MoreVertical,
  Video,
  Phone,
  Clock,
  Star,
  ChevronRight,
  Briefcase 
} from 'lucide-react';
import { backendUrl } from '@/helper';
import { toast } from 'react-toastify';

const Matches = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,setLoading] = useState(false)
  const [matchedUsers,setMatchedUsers] = useState([])

  const filters = [
    { id: 'all', label: 'All Matches', count: matchedUsers?.length },
    // { id: 'new', label: 'New', count: matchedUsers.filter(u => u.isNew).length },
    // { id: 'online', label: 'Online', count: matchedUsers.filter(u => u.status === 'online').length },
    // { id: 'developers', label: 'Developers', count: matchedUsers.filter(u => u.profession.toLowerCase().includes('developer')).length },
    // { id: 'students', label: 'Students', count: matchedUsers.filter(u => u.profession.toLowerCase().includes('aspirant')).length },
  ];

  // const filteredMatches = [...matchedUsers]
  const filteredMatches = matchedUsers?.filter(user => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return user.isNew;
    if (activeFilter === 'online') return user.status === 'online';
    if (activeFilter === 'developers') return user.profession.toLowerCase().includes('developer');
    if (activeFilter === 'students') return user.profession.toLowerCase().includes('aspirant');
    return true;
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'online': return 'Online now';
      case 'offline': return 'Last seen 2h ago';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  useEffect(() =>{
    const fetchMatches = async() =>{
  try {
    setLoading(true)
    const response = await fetch(`${backendUrl}/api/v1/match/get-matches`,{
      method:"GET",
      credentials:"include"
    })
    const data = await response.json()
    if(!response.ok){
      toast.error(data.error || data.message || "Something went wrong")
    }

    console.log("data",data)
    setMatchedUsers(data.matches)
  } catch (error) {
    
  }finally{
    setLoading(false)
  }
}
fetchMatches()
  },[])
console.log("filter",filteredMatches , matchedUsers)
  // return <>ee</>
  return (
    <div className=" overflow-auto bg-red-500 bg-gradient-to-br  from-gray-50 via-white to-purple-50 p-4 md:p-6">
    {/* // <div className=" overflow-auto   p-4 md:p-6"> */}
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your Matches
                </h1>
                <p className="text-gray-600 text-sm">Connect with your perfect hustle partners</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 w-64"
                />
              </div>
              
              <button className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{matchedUsers?.length}</p>
                </div>
                <div className="p-2 rounded-lg bg-purple-50">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Today</p>
                  <p className="text-2xl font-bold text-gray-900">{matchedUsers?.filter(u => u.isNew).length}</p>
                </div>
                <div className="p-2 rounded-lg bg-pink-50">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Online Now</p>
                  <p className="text-2xl font-bold text-gray-900">{matchedUsers?.filter(u => u.status === 'online').length}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Compatibility</p>
                  <p className="text-2xl font-bold text-gray-900">
                    88%
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search matches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {/* {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${activeFilter === filter.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                  }
                `}
              >
                {filter.label}
                <span className={`
                  px-1.5 py-0.5 rounded-full text-xs min-w-[20px] text-center
                  ${activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'}
                `}>
                  {filter.count}
                </span>
              </button>
            ))} */}
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1  overflow-y-auto h-[100vh] md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatches.map(match => (
              <div 
                key={match.id}
                className="group shadow bg-white max-h-[20rem] rounded-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Card Header */}
                <div className="px-6 pt-4 pb-3 border-b border-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img className="h-12 w-12 rounded-4xl object-cover" src={match.profilePic}/>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(match.status)}`}></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{match.fullName}</h3>
                          {/* {match?.isNew && ( */}
                            <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-medium">
                              NEW
                            </span>
                          {/* )} */}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="w-3 h-3" />
                          <span>{match.profession}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 rounded-lg hover:bg-gray-50">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Compatibility & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[120px] bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `88px` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{88}%</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{match.matchedAt.split("T")[0]}</span>
                    </div>
                  </div>
                     <div className='mb-2 text-zinc-500'>
                    {match?.oneLiner} 
                </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {match.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs rounded-full border border-purple-100"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {match.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{match.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3 pt-4">
                  {/* Last Message Preview */}
               {
                match?.lastMessage &&    <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Last message:</span>
                    </div>
                    {/* <p className="text-gray-800 line-clamp-2 text-sm">{match?.lastMessage}</p> */}
                  </div>
               }

                  {/* Location & Status */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{match?.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <div className={`w-2 h-2 rounded-full ${getStatusColor(match?.status)}`}></div> */}
                      {/* <span className="text-gray-600">{getStatusText(match?.status)}</span> */}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a href={`/chat-box?id=${match.id}`} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2" >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </a>
                    
                    <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors group/video">
                      <Video className="w-4 h-4 text-gray-600 group-hover/video:text-purple-600" />
                    </button>
                    
                    <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors group/call">
                      <Phone className="w-4 h-4 text-gray-600 group-hover/call:text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 mb-4">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `No matches found for "${searchQuery}". Try a different search or clear filters.`
                  : activeFilter !== 'all'
                  ? `No matches in the ${activeFilter} category. Try a different filter.`
                  : 'Start matching with people to see them here!'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* View All Button */}
          {filteredMatches.length > 0 && (
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:border-purple-300 hover:text-purple-700 transition-all group">
                View All Matches
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;

