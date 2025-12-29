import { AuthContext } from '@/AuthContext';
import React, { Children, useContext, useEffect, useState } from 'react'
import {v4 as uuid} from "uuid"
  const messages = [
    { id: 1, sender: "them", text: "Hey there! How have you been?", time: "10:15 AM" },
    { id: 2, sender: "me", text: "I've been good! Just working on some new projects.", time: "10:18 AM" },
    { id: 3, sender: "them", text: "That sounds exciting! What kind of projects?", time: "10:20 AM" },
    { id: 4, sender: "me", text: "Mostly web development stuff. I'm building a new chat interface.", time: "10:22 AM" },
    { id: 5, sender: "them", text: "Nice! Are we still meeting tomorrow to discuss it?", time: "10:25 AM" },
    { id: 6, sender: "me", text: "Absolutely! 2 PM still works for me.", time: "10:28 AM" }
  ];
const ChatWindow = ({chats ,selectedChat ,setSelectedChat} ) => {

const  {ws , user} =useContext(AuthContext)
const [msgInput,setMsgInput]  = useState("")
const [messages,SetMessages] = useState([])



useEffect(() =>{
    if(!ws.current) return
    const handleMessage = async(m:MessageEvent)=>{
        // console.log("message from websockt",m.toString())
        const data = JSON.parse(m.data)

        if(data.type === "personal-msg"){
            const msg = createMsg({content:data.content , msgId:uuid() , senderId:data.senderId,receiverId:data.receiverId,isMedia:false} )
            SetMessages((prev)=>[...prev,msg])
        }
        
    }
    ws.current.addEventListener("message",handleMessage)
    return () =>{
        ws.current?.removeEventListener("message",handleMessage)
    }
},[selectedChat])


const createMsg = ({content , msgId , senderId, receiverId , isMedia=false}:{content:string , msgId:string , senderId:string , receiverId:string ,isMedia:boolean})=>{
    if(!user) return
    console.log(user ,selectedChat)
    return {
        id:msgId,
        content:content,
        senderId:senderId,
        receiverId:receiverId,
        isMedia:isMedia,
    }
}
const sendMessage = () =>{
    console.log("ok")
    if(!user) return
    if(!ws.current) return
   const msg = createMsg({
  content: msgInput,
  msgId: crypto.randomUUID(),
  senderId: user.id,
  receiverId: selectedChat.id,
  isMedia:false
});
    
    ws.current.send(JSON.stringify({
        type:"personal-msg",
        content:msg?.content,
        receiverId:msg?.receiverId,
        senderId:msg?.senderId
    }))
    SetMessages((prev) =>[...prev,msg])
    setMsgInput("")
}


  return ( 
      <div className="w-2/3 flex flex-col">
        {
          selectedChat ? <> <div className="bg-white p-4 border-b border-gray-200 flex items-center">
          <img 
            src={selectedChat.profilePic} 
            alt={selectedChat.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{selectedChat.fullName}</h3>
            {/* <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${selectedChat.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <p className="text-sm text-gray-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
            </div> */}
          </div>
          <div className="ml-auto flex space-x-4">
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={()=>setSelectedChat(null)}>
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
            { messages?.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${message.senderId === user.id ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.senderId === user.id ? 'text-blue-200' : 'text-gray-500'} text-right`}>{message.time}</p>
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
              onChange={(e)=>setMsgInput(e.target.value)}
              value={msgInput}
              className="flex-1 mx-2 p-3 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                e.preventDefault()
                sendMessage()
                }
              }}
            />
            <button disabled={!msgInput} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full cursor-pointer transition-colors" onClick={sendMessage}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
        </> : <div className='flex justify-center items-center  h-screen'>
Please select a chat and start typing
        </div>
        }
        
      </div>
  )
}

export default ChatWindow
