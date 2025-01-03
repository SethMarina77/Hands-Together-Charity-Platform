import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/profile");
      console.log("Fetched user data:", data); // Debug log

      if (data && data.profileImage) {
        setUser({
          ...data,
          profileImage: data.profileImage,
        });
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const updateUser = useCallback(async (updates) => {
    try {
      const { data } = await axios.patch("/update-profile", updates);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
