import React, { createContext, useEffect, useState } from "react";
import type { AuthProvider } from "./types";
import { backendUrl } from "./helper";


export const AuthContext = createContext<AuthProvider>({
  user: null,
  isLoggedIn: false,
  loading: true,
  refreshUser: async() => {},
});

export function AuthProvider({ children }:{children :React.ReactNode}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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


  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading  ,refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
}
