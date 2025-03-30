import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userId, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://192.168.29.125:5000";

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      const token = await getToken();
      console.log("Saving preferences:", preferences);

      const response = await fetch(
        `${API_BASE_URL}/api/user/${userId}/preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(preferences),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response error:", errorData);
        throw new Error(errorData.error || "Failed to save preferences");
      }

      const data = await response.json();
      console.log("Save successful:", data);
      await fetchUserData();
      return data;
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        userId,
        time: new Date().toISOString(),
      });
      throw error;
    }
  };

  const updatePersonalInfo = async (personalInfo) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${API_BASE_URL}/api/user/${userId}/personal-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(personalInfo),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      await fetchUserData();
      return data;
    } catch (error) {
      console.error("Failed to update personal info:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        error,
        updatePreferences,
        updatePersonalInfo,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
