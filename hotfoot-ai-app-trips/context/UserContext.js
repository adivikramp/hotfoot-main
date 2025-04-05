import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userLocation,
        locationPermission,
        setUserLocation,
        setLocationPermission,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
