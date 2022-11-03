import { createContext, useEffect, useState } from "react";
import { auth } from "../../../config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState({});
  
  console.log("=========> AUTH");
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
