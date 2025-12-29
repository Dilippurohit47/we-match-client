import React, { createContext, useEffect, useRef, useState } from "react";
import type { AuthProvider } from "./types";
import { backendUrl, wsBackendUrl } from "./helper";
import type { UserProfile } from "./types/match";


export const AuthContext = createContext<AuthProvider>({
  user: null,
  isLoggedIn: false,
  loading: true,
  ws:{current:null},
  refreshUser: async() => {},
  connectionBooleanRef:{current:false}
});

export function AuthProvider({ children }:{children :React.ReactNode}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null)
  const connectionBooleanRef = useRef<boolean>(false);

  useEffect(() => {
refreshUser()
}, []);

const refreshUser = async () => {
  setLoading(true);

  try {
    const res = await fetch(`${backendUrl}/api/v1/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Not authenticated");
    }

    const data = await res.json();
    setUser(data.user);
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() =>{
if(user === null) return
const connect = async()=>{
  console.log("de")
  ws.current = new WebSocket(`${wsBackendUrl}`)
  ws.current.onopen=() =>{
    if(ws.current?.readyState === WebSocket.OPEN){
      ws.current.send(JSON.stringify({
        type:"user-info",
        userId:user.id
      }))
    }
    ws.current?.addEventListener("message",handleMessages)
    connectionBooleanRef.current = true
  } 
  ws.current.onclose =() =>{
    connectionBooleanRef.current = false
  }}
const handleMessages =(m:MessageEvent)=>{
  // const data = JSON.parse(m.data)
}
connect()
return ()=>{
  if(ws.current){
    ws.current.close(1000)
  }
  ws.current?.removeEventListener("message",handleMessages)
}
},[user])

  return (
    <AuthContext.Provider value={{ ws, connectionBooleanRef, user, isLoggedIn: !!user, loading  ,refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
}
