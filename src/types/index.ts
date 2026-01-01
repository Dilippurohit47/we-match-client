import type React from "react";
import type { UserProfile } from "./match"

    export  interface AuthProvider {
        user:UserProfile | null,
        isLoggedIn:boolean
        loading:boolean
      refreshUser: () => Promise<void>,
      ws: React.MutableRefObject<WebSocket | null>;
      connectionBooleanRef: React.MutableRefObject<boolean>;
      recentChats:string[]
      fetchRecentChats:()=>Promise<void>
    }  