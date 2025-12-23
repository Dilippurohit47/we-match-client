import { Navigate } from "react-router-dom";
import  React, {useContext} from "react"
import { AuthContext } from "@/AuthContext";

export function ProtectedRoute({ children }:{children:React.ReactNode}) {
  const { isLoggedIn, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}
