import ChatWindow from "@/components/ChatWindow";
import { backendUrl } from "@/helper";
import type { UserProfile } from "@/types/match";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "@/AuthContext";


const MessagePage = () => {
  const [loading,setLoading] = useState<boolean>(true)
  const [selectedChat,setSelectedChat] = useState<UserProfile | null>(null)
  const [searchParams ,setSearchParams] = useSearchParams()
  const selectedUserId = searchParams.get("id")
  const {user  ,fetchRecentChats  ,recentChats:chats} =useContext(AuthContext)

  useEffect(() =>{
    console.log("run")
fetchRecentChats()
    },[])
useEffect(() =>{
  if(!selectedUserId) return 
  const fetchUserForChat = async()=>{
    const response = await fetch(`${backendUrl}/api/v1/user/get-single-user/${selectedUserId}`,{
      method:"GET",
      credentials:"include"
    })
    const data =await response.json()
    if(!response.ok){
toast.error(data.message || data.error)
    }
    setSelectedChat(data.user)}
  fetchUserForChat()
},[selectedUserId])


const handleSelectChat = (user: UserProfile) => {
  setSelectedChat(user); 
  setSearchParams({ id: user.id });
};
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat List Panel */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full p-2 pl-10 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Chat List */}
       {
        chats.length > 0 &&  <div className="flex-1 overflow-y-auto">
          {chats.map((chat , index) => (
            <div 
              key={chat.id + index}
              className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors `}
              onClick={()=>handleSelectChat(chat)}
            >
              <div className="relative">
                <img 
                  src={chat.profilePic} 
                  alt={chat.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )} */}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{chat.fullName}</h3>
                  <span className="text-[1rem] text-gray-400">{chat.lastActive.split("T")[1].split(".")[0].split(":").slice(0,2).join(":")}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
              {(
                chat?.unreadCount?.userId === user.id  &&
                <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {chat?.unreadCount?.unreadMessages}
                </span>
              )}
            </div>
          ))}
        </div>
       }
      </div>

<ChatWindow  chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} setSearchParams={setSearchParams}/>
    </div>
  );
};

export default MessagePage;