import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}