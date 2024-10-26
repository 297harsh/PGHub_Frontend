import { createContext, useState, useEffect } from "react";
import { getUserData } from "./getUserData";

export const UserContext = createContext(null);

export const UserData = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accesstoken");
      if (token) {
        const userData = await getUserData(token);
        if (userData != user) {
          
          if (userData.is_verified) {
            if (
              (userData.role == "owner" && userData.is_ownerVerified) ||
              (userData.role == "renter" && userData.is_renterVerified) || 
              (userData.role == "admin" && userData.is_adminVerified) 
            ) {
              setUser(userData);
            }
          }
        }
      }
      setLoading(false);
    };
    fetchUserData();
    console.log("==>", user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
