import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/topBar";
import BottomBarContinueBtn from "../../components/buttons/bottomBarContinueBtn";
import { MapPin } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

const LocationPermission = () => {
  const navigationRouter = useNavigation();
  const {
    setUserLocation,
    setLocationPermission,
  } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleDone = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationPermission("denied");
        navigationRouter.navigate("preferences/allSet");
        return;
      }

      setLocationPermission("granted");

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }).catch(() => null);

        if (location) {
          const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }).catch(() => []);

          if (address.length > 0) {
            const firstAddress = address[0];
            setUserLocation({
              coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              city: firstAddress.city || "Unknown city",
              country: firstAddress.country || "Unknown country",
            });
          }
        }
      } catch (error) {
        setUserLocation(null);
      }

      navigationRouter.navigate("preferences/allSet");
    } catch (error) {
      navigationRouter.navigate("preferences/allSet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar backarrow progress={0.75} />
      <View style={styles.container}>
        <View className="items-center justify-center my-8">
          <MapPin size={96} color="#000" />
        </View>
        <Text style={styles.title}>Enable Location Services</Text>
        <Text style={styles.description}>
          To provide you with the best experience, we need access to your
          location.
        </Text>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : ""}
      </View>

      <BottomBarContinueBtn handleDone={handleDone} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 15,
    paddingVertical: 15,
    width: "90%",
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});

export default LocationPermission;
