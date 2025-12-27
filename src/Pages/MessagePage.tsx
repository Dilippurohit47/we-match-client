const MessagePage = () => {
  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMessage: "Hey! Are we still meeting tomorrow?",
      time: "10:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sam Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      lastMessage: "Thanks for your help with the project!",
      time: "Yesterday",
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: "Taylor Swift",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      lastMessage: "Can you send me the files?",
      time: "2 days ago",
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      lastMessage: "😂 That was hilarious!",
      time: "3 days ago",
      unread: 5,
      online: false
    },
    {
      id: 5,
      name: "Casey Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
      lastMessage: "Let's catch up this weekend",
      time: "1 week ago",
      unread: 0,
      online: true
    }
  ];

  // Sample messages for selected chat
  const messages = [
    { id: 1, sender: "them", text: "Hey there! How have you been?", time: "10:15 AM" },
    { id: 2, sender: "me", text: "I've been good! Just working on some new projects.", time: "10:18 AM" },
    { id: 3, sender: "them", text: "That sounds exciting! What kind of projects?", time: "10:20 AM" },
    { id: 4, sender: "me", text: "Mostly web development stuff. I'm building a new chat interface.", time: "10:22 AM" },
    { id: 5, sender: "them", text: "Nice! Are we still meeting tomorrow to discuss it?", time: "10:25 AM" },
    { id: 6, sender: "me", text: "Absolutely! 2 PM still works for me.", time: "10:28 AM" }
  ];

  // Currently selected chat
  const selectedChat = chats[0];

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
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${selectedChat.id === chat.id ? 'bg-blue-50' : ''}`}
            >
              <div className="relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window Panel */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 border-b border-gray-200 flex items-center">
          <img 
            src={selectedChat.avatar} 
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{selectedChat.name}</h3>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${selectedChat.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <p className="text-sm text-gray-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="ml-auto flex space-x-4">
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"></path>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${message.sender === 'me' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'} text-right`}>{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 p-2 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-2 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 mx-2 p-3 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full cursor-pointer transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;