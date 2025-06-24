import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // ✅ Make sure you import db
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // ✅ profile data (coins etc.)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);

      if (user) {
        try {
          // Fetch profile from Firestore
          const docRef = doc(db, "users", user.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setUserData(snap.data()); // e.g. { coins: 2, email: ..., createdAt: ... }
          } else {
            setUserData(null); // User has no profile doc
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserData(null);
        }
      } else {
        setUserData(null); // Logged-out, reset profile
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    isLoggedIn,
    setIsLoggedIn,
    userData, // ✅ new!
  };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
}

// Hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
