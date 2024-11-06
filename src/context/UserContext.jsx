"use client"

import { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {

  const [globalUser, setGlobalUser] = useState("");

  useEffect(() => {
    if (globalUser) {
    // alert("user logged in as "+ globalUser)
      
    } else {
      // alert(("No user defined"))
    }
  
  }, [globalUser])
  
  return (
    <UserContext.Provider value={{ globalUser, setGlobalUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
