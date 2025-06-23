import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [coins, setCoins] = useState(10);

  // Dummy login and logout to test
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  //   useEffect(() => {
  //   const savedCoins = localStorage.getItem("coins");
  //   if (savedCoins) setCoins(Number(savedCoins));
  // }, []);


  //   useEffect(() => {
  //   localStorage.setItem("coins", coins);
  // }, [coins]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, coins, setCoins }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy use of the context
export function useAuth() {
  return useContext(AuthContext);
}
