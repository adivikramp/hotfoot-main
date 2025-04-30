import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useTripSearchStore from "../store/trpiSearchZustandStore";
import useTravelPreferencesStore from "../store/travelPreferencesZustandStore";
import useItineraryStore from "../store/itineraryZustandStore";
import TopBar from "../../components/topBar";
import BottomBarContinueBtn from "../../components/buttons/bottomBarContinueBtn";
import { useRouter } from "expo-router";
import DatePickerModal from "../../components/datePickerModal/datePickerModal";
import { GetPlaceDetails } from "../../services/GlobalApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SkeletonLoading from "../../components/skeletonLoading/skeletonLoading";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const TravelersDropdown = ({ travelers, setTravelers }) => {
  const updateTravelerCount = (type, increment) => {
    const newCount = increment ? travelers[type] + 1 : travelers[type] - 1;
    if (newCount < 0) return;
    if (type === "adults" && newCount === 0) return;
    if (type === "infants" && newCount > travelers.adults) return;

    setTravelers({
      ...travelers,
      [type]: newCount,
    });
  };

  return (
    <View style={styles.travelersDropdown}>
      <View style={styles.travelerContent}>
        <View style={styles.travelerType}>
          <View>
            <Text style={styles.travelerTitle}>Adults</Text>
            <Text style={styles.travelerSubtitle}>Age 13+</Text>
          </View>
          <View style={styles.counter}>
            <Pressable
              style={[
                styles.counterButton,
                travelers.adults <= 1 && styles.buttonDisabled,
              ]}
              onPress={() => updateTravelerCount("adults", false)}
              disabled={travelers.adults <= 1}
            >
              <Text
                style={
                  travelers.adults <= 1
                    ? styles.counterButtonTextDisabled
                    : styles.counterButtonText
                }
              >
                -
              </Text>
            </Pressable>
            <Text style={styles.count}>{travelers.adults}</Text>
            <Pressable
              style={styles.counterButton}
              onPress={() => updateTravelerCount("adults", true)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.travelerType}>
          <View>
            <Text style={styles.travelerTitle}>Children</Text>
            <Text style={styles.travelerSubtitle}>Age 2-12</Text>
          </View>
          <View style={styles.counter}>
            <Pressable
              style={[
                styles.counterButton,
                travelers.children === 0 && styles.buttonDisabled,
              ]}
              onPress={() => updateTravelerCount("children", false)}
              disabled={travelers.children === 0}
            >
              <Text
                style={
                  travelers.children === 0
                    ? styles.counterButtonTextDisabled
                    : styles.counterButtonText
                }
              >
                -
              </Text>
            </Pressable>
            <Text style={styles.count}>{travelers.children}</Text>
            <Pressable
              style={styles.counterButton}
              onPress={() => updateTravelerCount("children", true)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.travelerType}>
          <View>
            <Text style={styles.travelerTitle}>Infants</Text>
            <Text style={styles.travelerSubtitle}>Under 2</Text>
          </View>
          <View style={styles.counter}>
            <Pressable
              style={[
                styles.counterButton,
                travelers.infants === 0 && styles.buttonDisabled,
              ]}
              onPress={() => updateTravelerCount("infants", false)}
              disabled={travelers.infants === 0}
            >
              <Text
                style={
                  travelers.infants === 0
                    ? styles.counterButtonTextDisabled
                    : styles.counterButtonText
                }
              >
                -
              </Text>
            </Pressable>
            <Text style={styles.count}>{travelers.infants}</Text>
            <Pressable
              style={[
                styles.counterButton,
                travelers.infants >= travelers.adults && styles.buttonDisabled,
              ]}
              onPress={() => updateTravelerCount("infants", true)}
              disabled={travelers.infants >= travelers.adults}
            >
              <Text
                style={
                  travelers.infants >= travelers.adults
                    ? styles.counterButtonTextDisabled
                    : styles.counterButtonText
                }
              >
                +
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const ReviewSummaryScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTravelersDropdownOpen, setIsTravelersDropdownOpen] = useState(false);

  const {
    fromLocation,
    toLocation,
    dates,
    travelers,
    tripType,
    setDatesToStore,
    setTravelersToStore,
  } = useTripSearchStore();
  const { selectedButtons, budgetPreference } = useTravelPreferencesStore();
  const { setGeneratedPlaces, setGeneratedItinerary, setTripParameters } =
    useItineraryStore();

  const generateTrip = async () => {
    if (!user) {
      Alert.alert(
        "Authentication Required",
        "Please sign in to generate an itinerary.",
        [
          { text: "Sign In", onPress: () => router.push("/login") },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    if (!toLocation?.geoCode) {
      Alert.alert("Error", "Please select a destination");
      return;
    }
    if (!dates.startDate || !dates.endDate) {
      Alert.alert("Error", "Please select travel dates");
      return;
    }

    setIsGenerating(true);

    try {
      // 1. Fetch nearby places
      const places = await fetchNearbyPlaces();
      if (!places || places.length === 0) {
        Alert.alert("No places found", "Couldn't find any nearby attractions");
        return;
      }
      setGeneratedPlaces(places);

      // 2. Prepare data for itinerary generation
      const itineraryData = {
        destination: toLocation?.name || "",
        coordinates: {
          latitude: toLocation?.geoCode.latitude,
          longitude: toLocation?.geoCode.longitude,
        },
        dates: {
          start: dates.startDate,
          end: dates.endDate,
          duration: dates.totalDays,
          totalNights: dates.totalDays - 1,
        },
        travelers: {
          adults: travelers.adults,
          children: travelers.children,
          infants: travelers.infants,
          description: getTravelerDescription(travelers),
        },
        preferences: {
          interests: selectedButtons,
          budget: budgetPreference,
          tripType: tripType,
        },
        places: places,
      };

      // Save trip parameters to store
      setTripParameters({
        destination: toLocation?.name,
        dates,
        travelers,
        preferences: {
          interests: selectedButtons,
          budget: budgetPreference,
          tripType,
        },
      });

      // 3. Generate the AI itinerary
      const itinerary = await generateAItinerary(itineraryData);
      const enrichedItinerary = enrichItinerary(itinerary, places);
      setGeneratedItinerary(enrichedItinerary);

      console.log(
        "Generated itinerary:",
        JSON.stringify(enrichedItinerary, null, 2)
      );

      // 4. Save to Firebase
      await saveItineraryToDB({
        places,
        itinerary: enrichedItinerary,
        parameters: itineraryData,
      });

      // 5. Navigate to trips screen
      router.replace({
        pathname: "(tabs)/trips",
        params: {
          newlyGenerated: "true",
        },
      });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      Alert.alert("Error", "Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchNearbyPlaces = async () => {
    try {
      if (!toLocation?.geoCode) {
        throw new Error("Destination location not set");
      }

      const response = await GetPlaceDetails({
        includedPrimaryTypes: [
          "tourist_attraction",
          "museum",
          "park",
          "restaurant",
          "shopping_mall",
          "amusement_park",
          "aquarium",
          "art_gallery",
          "cafe",
        ],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: toLocation.geoCode.latitude,
              longitude: toLocation.geoCode.longitude,
            },
            radius: 15000,
          },
        },
      });

      console.log("Places Response:", response?.places);
      return response?.places || [];
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      Alert.alert("Error", "Failed to fetch nearby places. Please try again.");
      return [];
    }
  };

  const getTravelerDescription = (travelers) => {
    const total = travelers.adults + travelers.children + travelers.infants;
    if (total === 1) return "Only Me";

    let description = `${travelers.adults} Adult${
      travelers.adults > 1 ? "s" : ""
    }`;
    if (travelers.children > 0) {
      description += `, ${travelers.children} Child${
        travelers.children > 1 ? "ren" : ""
      }`;
    }
    if (travelers.infants > 0) {
      description += `, ${travelers.infants} Infant${
        travelers.infants > 1 ? "s" : ""
      }`;
    }
    return description;
  };

  const generateAItinerary = async (itineraryData) => {
    const placesPerDay = Math.ceil(
      itineraryData.places.length / itineraryData.dates.duration
    );
    const prompt = `
      You are a travel planner generating a detailed itinerary for a trip to ${
        itineraryData.destination
      } for 
      ${itineraryData.dates.duration} days and ${
      itineraryData.dates.totalNights
    } nights 
      for ${itineraryData.travelers.description} with a ${
      itineraryData.preferences.budget
    } budget.

      Trip Type: ${itineraryData.preferences.tripType}
      Interests: ${itineraryData.preferences.interests.join(", ")}

      Create a day-by-day itinerary using the following ${
        itineraryData.places.length
      } places (use all provided details):
      ${JSON.stringify(itineraryData.places, null, 2)}

      Requirements:
      1. Distribute the ${itineraryData.places.length} places evenly across ${
      itineraryData.dates.duration
    } days, with approximately ${placesPerDay} places per day.
      2. Each day should start around 10 AM and end by 8 PM.
      3. Group nearby locations together based on their coordinates (latitude, longitude) to minimize travel time.
      4. Include lunch breaks at appropriate times, selecting restaurants or cafes from the provided places if available.
      5. Consider weather conditions (provide suitable indoor alternatives like museums or cafes if rain is expected).
      6. Ensure the itinerary matches the ${
        itineraryData.preferences.budget
      } budget level (e.g., prioritize free or low-cost activities for Budget, high-end dining and exclusive experiences for Luxury).
      7. Provide transportation tips specific to ${itineraryData.destination}.
      8. Ensure the itinerary is realistic, enjoyable, and aligns with the user's interests.
      9. Use the place names exactly as provided in the places array for matching purposes.

      Output Format (strict JSON, do not deviate):
      {
        "dailyItinerary": [
          {
            "day": 1,
            "date": "${itineraryData.dates.start}",
            "activities": [
              {
                "time": "10:00 AM",
                "place": "Place Name",
                "type": "Attraction/Activity",
                "duration": "2 hours",
                "description": "Brief description of the activity",
                "travelTimeFromPrevious": "15 mins walk",
                "notes": "Any special notes (e.g., ticket booking required)"
              }
            ],
            "lunch": {
              "time": "1:00 PM",
              "place": "Restaurant Name",
              "type": "Lunch",
              "duration": "1 hour",
              "description": "Brief description of the dining experience"
            }
          }
        ],
        "transportationTips": "Specific transportation tips for ${
          itineraryData.destination
        }",
        "additionalNotes": "Any additional notes or recommendations"
      }

      Ensure the response is valid JSON and strictly follows the specified structure. Use all ${
        itineraryData.places.length
      } places provided, and include their names in the dailyItinerary activities.
    `;

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text();

      // Parse the JSON response
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);

      const parsedItinerary = JSON.parse(jsonString);
      return parsedItinerary;
    } catch (error) {
      console.error("Error generating AI itinerary:", error);
      throw new Error("Failed to generate itinerary with AI");
    }
  };

  const enrichItinerary = (itinerary, places) => {
    const placeMap = new Map(
      places.map((place) => [place.displayName?.text || place.name, place])
    );

    const enrichedDailyItinerary = itinerary.dailyItinerary.map((day) => {
      const enrichedActivities = day.activities.map((activity) => {
        const fullPlace = placeMap.get(activity.place);
        if (fullPlace) {
          return {
            ...activity,
            rating: fullPlace.rating || null,
            userRatingCount: fullPlace.userRatingCount || null,
            photos: fullPlace.photos || [],
            location: fullPlace.location || {},
          };
        }
        return activity;
      });

      let enrichedLunch = null;
      if (day.lunch) {
        const fullLunchPlace = placeMap.get(day.lunch.place);
        enrichedLunch = fullLunchPlace
          ? {
              ...day.lunch,
              rating: fullLunchPlace.rating || null,
              userRatingCount: fullLunchPlace.userRatingCount || null,
              photos: fullLunchPlace.photos || [],
              location: fullLunchPlace.location || {},
            }
          : day.lunch;
      }

      return {
        ...day,
        activities: enrichedActivities,
        lunch: enrichedLunch,
      };
    });

    return {
      ...itinerary,
      dailyItinerary: enrichedDailyItinerary,
    };
  };

  const saveItineraryToDB = async ({ places, itinerary, parameters }) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const docRef = await addDoc(collection(db, "itineraries"), {
        clerkUserId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress || "unknown",
        places, // Array of all places with full details
        itinerary: {
          dailyItinerary: itinerary.dailyItinerary,
          transportationTips: itinerary.transportationTips,
          additionalNotes: itinerary.additionalNotes,
        },
        parameters: {
          destination: parameters.destination,
          coordinates: parameters.coordinates,
          dates: parameters.dates,
          travelers: parameters.travelers,
          preferences: parameters.preferences,
        },
        createdAt: serverTimestamp(),
      });
      console.log("Itinerary saved to Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving itinerary to Firestore:", error);
      throw new Error("Failed to save itinerary to database");
    }
  };

  const updateTravelerCount = (type, increment) => {
    const newCount = increment ? travelers[type] + 1 : travelers[type] - 1;
    if (newCount < 0) return;
    if (type === "adults" && newCount === 0) return;
    if (type === "infants" && newCount > travelers.adults) return;

    const updatedTravelers = {
      ...travelers,
      [type]: newCount,
    };
    setTravelersToStore(updatedTravelers);
  };

  const handleDateConfirm = (selectedDates) => {
    setDatesToStore({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
    setIsDatePickerVisible(false);
  };

  const getTotalTravelers = () => {
    return travelers.adults + travelers.children + travelers.infants;
  };

  const interestEmojis = {
    "Adventure Travel": "🏞️",
    "Beach Vacations": "🏖️",
    "Road Trips": "🚗",
    "Food Tourism": "🍔",
    "Art Galleries": "🖼️",
  };

  const budgetEmojis = {
    Budget: "💲",
    Moderate: "💲💲",
    Luxury: "💎",
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <SkeletonLoading />
        <Text style={styles.loadingText}>
          Finding the best places in {toLocation?.name}...
        </Text>
        <Text>We're creating your perfect itinerary based on:</Text>
        <Text>- {selectedButtons.join(", ")}</Text>
        <Text>- {budgetPreference} budget</Text>
        <Text>- {getTotalTravelers()} travelers</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <TopBar backarrow text={"Review Summary"} />

      <ScrollView style={{ marginVertical: 20 }}>
        {/* Destination Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconLabelContainer}>
              <Ionicons name="location-outline" size={24} color="#000" />
              <Text style={styles.sectionLabel}>Destination</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/search/destination")}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {toLocation && (
            <View style={styles.destinationContent}>
              <View style={styles.destinationDetails}>
                <Text style={styles.destinationName}>{toLocation.name}</Text>
                <View style={styles.countryContainer}>
                  <Text style={styles.countryName}>
                    {toLocation.country || tripType}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Party Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconLabelContainer}>
              <Ionicons name="people-outline" size={24} color="#000" />
              <Text style={styles.sectionLabel}>Party</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setIsTravelersDropdownOpen(!isTravelersDropdownOpen)
              }
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionContent}>
            {getTotalTravelers()}{" "}
            {getTotalTravelers() === 1 ? "Person" : "People"}
          </Text>

          {isTravelersDropdownOpen && (
            <View style={styles.dropdownContainer}>
              <TravelersDropdown
                travelers={travelers}
                setTravelers={(updated) => {
                  setTravelersToStore(updated);
                  setIsTravelersDropdownOpen(false);
                }}
              />
            </View>
          )}
        </View>

        {/* Trip Dates Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconLabelContainer}>
              <Ionicons name="calendar-outline" size={24} color="#000" />
              <Text style={styles.sectionLabel}>Trip Dates</Text>
            </View>
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionContent}>
            {dates.startDate} to {dates.endDate}
          </Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconLabelContainer}>
              <Ionicons name="star-outline" size={24} color="#000" />
              <Text style={styles.sectionLabel}>
                {selectedButtons.length} Interests
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/preferences/travelPreferences",
                  params: { returnPath: "/preferences/tripReview" },
                })
              }
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.interestsContainer}>
            {selectedButtons.map((interest, index) => (
              <View key={index} style={styles.interestButton}>
                <Text style={styles.interestText}>
                  {interest} {interestEmojis[interest] || ""}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Budget Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconLabelContainer}>
              <Ionicons name="cash-outline" size={24} color="#000" />
              <Text style={styles.sectionLabel}>Budget</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/preferences/budgetSelection",
                  params: { returnPath: "/preferences/tripReview" },
                })
              }
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionContent}>
            {budgetPreference
              ? `${
                  budgetPreference.charAt(0).toUpperCase() +
                  budgetPreference.slice(1)
                } ${budgetEmojis[budgetPreference] || ""}`
              : "Not set"}
          </Text>
        </View>
      </ScrollView>

      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDates={handleDateConfirm}
        activeTab="Places"
        tripType={tripType}
        initialDates={dates}
      />

      <BottomBarContinueBtn
        handleDone={generateTrip}
        buttonText={"Generate Trip"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 24,
  },
  section: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionIconLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 10,
  },
  sectionContent: {
    fontSize: 15,
    color: "#333",
    marginLeft: 34,
  },
  destinationContent: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 34,
  },
  destinationImageContainer: {
    marginRight: 15,
  },
  destinationImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  destinationDetails: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 5,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginRight: 6,
  },
  countryName: {
    fontSize: 14,
    color: "#555",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 34,
  },
  interestButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  interestText: {
    fontSize: 14,
    color: "#333",
  },
  travelersDropdown: {
    marginTop: 8,
    position: "relative",
    zIndex: 4,
  },
  travelerContent: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  travelerType: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  travelerTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  travelerSubtitle: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    zIndex: 5,
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {},
  counterButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  counterButtonTextDisabled: {
    color: "#999",
    fontSize: 20,
    fontWeight: "bold",
  },
  count: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    minWidth: 24,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    textAlign: "center",
  },
});

export default ReviewSummaryScreen;
