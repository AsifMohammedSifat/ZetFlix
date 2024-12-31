"use client";

import { useState } from "react";
import { AuthContext } from "../context";
export default function AuthProvider({ children }) {
  // const [auth, setAuth] = useLocalStorage("auth",[]);
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
