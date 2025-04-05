import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import TopBar from "../../components/topBar";
import { StatusBar } from "expo-status-bar";
import { Grip, Trash2 } from "lucide-react-native";

export default function Edit() {
  const router = useRouter();
  const { tripData } = useLocalSearchParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tripData) {
      try {
        if (typeof tripData === "string") {
          const parsedTrip = JSON.parse(tripData);
          setTrip(parsedTrip);
        } else {
          throw new Error("Invalid trip data format");
        }
      } catch (err) {
        console.error("Error parsing trip data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No trip data provided");
      setLoading(false);
    }
  }, [tripData]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">Error: {error}</Text>
        <TouchableOpacity
          className="px-4 py-2 bg-gray-200 rounded"
          onPress={() => router.back()}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!trip || !trip.dailyPlan) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="mb-4">No trip data available</Text>
        <TouchableOpacity
          className="px-4 py-2 bg-gray-200 rounded"
          onPress={() => router.back()}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4 pt-12">
      <TopBar text="Edit Itinerary" backarrow={true} rightIcons={[]} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(trip.dailyPlan).map(([dayKey, dayPlan]) => (
          <View key={dayKey} className="mb-8">
            <Text className="text-xl font-semibold mb-4">
              {dayKey.replace("day", "Day ")}
            </Text>

            {dayPlan.places?.map((place, index) => (
              <View
                key={index}
                className="flex-row mb-4 items-center p-3 rounded-lg"
              >
                <View className="mr-3">
                  <Grip size={20} color="black" />
                </View>
                {place.image && (
                  <Image
                    source={{ uri: place.image }}
                    className="w-20 h-16 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                )}
                <View className="flex-1">
                  <Text className="text-lg font-bold">{place.name}</Text>
                  <Text className="text-gray-500 text-sm">{place.time}</Text>
                </View>
                <View className="mr-3">
                  <Trash2 size={20} color="red" />
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-4 left-0 right-0 px-4 bg-white h-12">
        <TouchableOpacity className="bg-green-100 rounded-full py-4 items-center justify-center">
          <Text className="text-green-500 font-medium">Add More Events</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" backgroundColor="black" />
    </View>
  );
}
