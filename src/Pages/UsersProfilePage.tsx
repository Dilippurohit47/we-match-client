import { backendUrl } from "@/helper";
import type { UserProfile } from "@/types/match";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UsersProfilePage = () => {
  const { userId } = useParams();
  
  const [user,setUser] = useState<UserProfile | null>(null)
useEffect(() =>{
const fetchUserWithId = async() =>{
  try {
    console.log("user",userId)
    const response = await fetch(`${backendUrl}/api/v1/user/get-single-user/${userId}`,{
      method:"GET",
      credentials:"include"
    })
    const data  = await response.json()
    if(!response.ok){
      setUser(null)
      return
    }
    
    setUser(data.user)
  } catch (error) {
    toast.error("something went wrong")
    console.log(error)
  }
}

fetchUserWithId()
},[userId])

  // const user = {
  //   id: "user_123",
  //   email: "alex.johnson@example.com",
  //   fullName: "Alex Johnson",
  //   age: 28,
  //   gender: "Male",
  //   profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  //   bio: "Full-stack developer passionate about creating beautiful, functional web applications. Love hiking, photography, and trying new coffee shops!",
  //   oneLiner: "Building the future, one line of code at a time ☕",
  //   profession: "Senior Software Engineer",
  //   lat: 37.7749,
  //   long: -122.4194,
  //   city: "San Francisco",
  //   country: "USA",
  //   landmark: "Golden Gate Bridge area",
  //   portfolio: "https://alexjohnson.dev",
  //   emailVerified: true,
  //   phoneVerified: true,
  //   lastActive: "2024-01-15T10:30:00Z",
  //   profileCompletion: 85,
  //   totalMatches: 47,
  //   skills: ["React", "TypeScript", "Node.js", "UI/UX Design", "AWS", "GraphQL"],
  //   subjects: ["Web Development", "Machine Learning", "Photography", "Coffee Brewing"],
  //   matchPreference: {
  //     lookingFor: "Collaboration & Friendship",
  //     distance: 50,
  //     ageRange: [25, 35]
  //   }
  // };

  // Format last active time
  const getLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
   {
    user ?    <div className="max-w-6xl mx-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-700 rounded-2xl shadow-xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={user.profilePic} 
                alt={user.fullName}
                className="w-32 h-32 object-cover md:w-40 md:h-40 rounded-2xl border-4 border-white/30 shadow-2xl"
              />
              {user.emailVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{user.fullName}, {user.age}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {user.profession}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {user.city}
                    </span>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="mt-4 md:mt-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{user.totalMatches}</div>
                      <div className="text-sm opacity-90">Matches</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* One Liner */}
              <p className="text-xl italic opacity-90 mb-4">"{user.oneLiner}"</p>
              
              {/* Activity Status */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">Active {getLastActive(user.lastActive)}</span>
                </div>
                <span className="opacity-75">•</span>
                <span className="text-sm">{user.emailVerified ? "✓ Email Verified" : "Email Unverified"}</span>
                <span className="opacity-75">•</span>
                <span className="text-sm">{user.phoneVerified ? "✓ Phone Verified" : "Phone Unverified"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  About Me
                </h2>
                <span className="text-sm text-gray-500">Profile Completion: {user.profileCompletion}%</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              
              {/* Portfolio Link */}
              {user.portfolio && (
                <div className="mt-6">
                  <a 
                    href={user.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                    </svg>
                    View Socials
                  </a>
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {user.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-full text-purple-700 font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Subjects Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
                Interests & Subjects
              </h2>
              <div className="flex flex-wrap gap-3">
                {user.subjects.map((subject, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full text-blue-700 font-medium"
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Match Preferences */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
                Match Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Looking For</div>
                    {/* <div className="text-gray-900 font-semibold">{user.matchPreference.lookingFor}</div> */}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Distance Range</div>
                    {/* <div className="text-gray-900 font-semibold">Within {user.matchPreference.distance}km</div> */}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Age Preference</div>
                    {/* <div className="text-gray-900 font-semibold">{user.matchPreference.ageRange[0]} - {user.matchPreference.ageRange[1]} years</div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
                Location
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <div className="font-medium text-gray-700">{user.city}, {user.country}</div>
                    {user.landmark && (
                      <div className="text-sm text-gray-500">Near {user.landmark}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <div className="font-medium text-gray-700">Coordinates</div>
                    <div className="text-sm text-gray-500">
                      {user.lat?.toFixed(4)}, {user.long?.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Action Buttons */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Connect with {user.fullName.split(' ')[0]}</h3>
              <div className="space-y-3">
                <button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  Send Message
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  View Matches
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                  </svg>
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-purple-600">{user.totalMatches}</div>
            <div className="text-gray-600">Total Matches</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-blue-600">{user.profileCompletion}%</div>
            <div className="text-gray-600">Profile Complete</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-indigo-600">{user.skills.length}</div>
            <div className="text-gray-600">Skills</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-purple-600">{user.age}</div>
            <div className="text-gray-600">Age</div>
          </div>
        </div>
      </div> : <div> There is some error in finding user try again later</div>
   }
    </div>
  );
};

export default UsersProfilePage;