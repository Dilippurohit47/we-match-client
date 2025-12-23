import { AuthContext } from "@/AuthContext";
import type React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function PublicRoute({children}:{children:React.ReactNode}){
    const {isLoggedIn , loading} = useContext(AuthContext)
    if(loading) return <div>Loading....</div>
    if(isLoggedIn){
        return <Navigate  to="/matching" />
    }   
    return children
}