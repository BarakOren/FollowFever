import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);             // Save full user object
      setIsLoggedIn(!!user);           // true if user exists
      setLoading(false);               // auth init is complete
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    isLoggedIn,
    setIsLoggedIn, // optional to control this manually
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Easy useAuth() hook
export function useAuth() {
  return useContext(AuthContext);
}
