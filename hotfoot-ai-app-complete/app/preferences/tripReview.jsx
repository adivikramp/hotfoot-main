import React, { useState } from "react";
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
import TopBar from "../../components/topBar";
import BottomBarContinueBtn from "../../components/buttons/bottomBarContinueBtn";
import { useRouter } from "expo-router";
import DatePickerModal from "../../components/datePickerModal/datePickerModal";
import { GetPlaceDetails } from "../../services/GlobalApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SkeletonLoading from "../../components/skeletonLoading/skeletonLoading";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
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

const ReviewSummaryScreen = ({ navigation }) => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

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

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTravelersDropdownOpen, setIsTravelersDropdownOpen] = useState(false);

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

  // Handle date confirmation
  const handleDateConfirm = (selectedDates) => {
    setDatesToStore({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
    setIsDatePickerVisible(false);
  };

  // const handleEditInterests = () => {
  //   router.push({
  //     pathname: "/preferences/travelPreferences",
  //     params: {
  //       returnPath: "/preferences/tripReview",
  //       flow: "review",
  //     },
  //   });
  // };

  // const handleEditBudget = () => {
  //   router.push({
  //     pathname: "/preferences/budgetSelection",
  //     params: { returnPath: "/preferences/tripReview" },
  //   });
  // };

  const generateTrip = async () => {
    setIsGenerating(true);
    const { setGeneratedPlaces, setGeneratedItinerary, setTripParameters } =
      useItineraryStore.getState();

    try {
      // 1. First fetch nearby places
      const nearbyPlaces = await fetchNearbyPlaces();
      setGeneratedPlaces(nearbyPlaces);

      if (!nearbyPlaces || nearbyPlaces.length === 0) {
        Alert.alert("No places found", "Couldn't find any nearby attractions");
        return;
      }

      // 2. Prepare data for itinerary generation
      const itineraryData = {
        destination: toLocation?.name || "",
        coordinates: {
          latitude: 19.07609,
          longitude: 72.877426,
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
        nearbyPlaces: nearbyPlaces.map((place) => ({
          name: place.displayName?.text || "Unknown Place",
          types: place.types || [],
          rating: place.rating || 0,
        })),
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
      setGeneratedItinerary(itinerary);

      // 4. Save to database
      // await saveItineraryToDB({
      //   places: nearbyPlaces,
      //   itinerary,
      //   parameters: itineraryData,
      // });

      // 5. Navigate to itinerary screen
      router.replace({
        pathname: "/itinerary",
        params: {
          newlyGenerated: "true", // Flag to indicate this is a new itinerary
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
      // if (!toLocation?.geoCode) {
      //   throw new Error("Destination location not set");
      // }

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
              // latitude: toLocation.geoCode.latitude,
              // longitude: toLocation.geoCode.longitude,
              latitude: 19.07609,
              longitude: 72.877426,
            },
            radius: 15000,
          },
        },
      });

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
    const prompt = `
      Generate a detailed travel plan for ${itineraryData.destination} for 
      ${itineraryData.dates.duration} Days and ${
      itineraryData.dates.totalNights
    } Nights 
      for ${itineraryData.travelers.description} with a ${
      itineraryData.preferences.budget
    } budget.
      
      Trip Type: ${itineraryData.preferences.tripType}
      Interests: ${itineraryData.preferences.interests.join(", ")}
      
      Please create a day-by-day itinerary using the following ${
        itineraryData.nearbyPlaces.length
      } places:
      ${itineraryData.nearbyPlaces
        .map((place) => `- ${place.name} (Rating: ${place.rating})`)
        .join("\n")}
      
      Requirements:
      1. Divide the places evenly across ${itineraryData.dates.duration} days
      2. Each day should start around 10 AM and end by 8 PM
      3. Group nearby locations together to minimize travel time
      4. Include lunch breaks at appropriate times
      5. Consider weather conditions (provide suitable indoor alternatives if rain is expected)
      6. Ensure the itinerary matches the ${
        itineraryData.preferences.budget
      } budget level
      
      Output Format (JSON):
      {
        "destination": "${itineraryData.destination}",
        "duration": "${itineraryData.dates.duration} days",
        "budget": "${itineraryData.preferences.budget}",
        "travelers": ${JSON.stringify(itineraryData.travelers)},
        "interests": ${JSON.stringify(itineraryData.preferences.interests)},
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
                "description": "Brief description",
                "travelTimeFromPrevious": "15 mins walk",
                "notes": "Any special notes"
              },
              // More activities...
            ],
            "lunch": {
              "time": "1:00 PM",
              "place": "Restaurant Name",
              "type": "Lunch",
              "duration": "1 hour"
            }
          },
          // More days...
        ],
        "hotelRecommendations": [
          {
            "name": "Hotel Name",
            "address": "Hotel Address",
            "priceRange": "$100-$150/night",
            "rating": 4.5,
            "budgetMatch": "${itineraryData.preferences.budget}"
          }
          // More hotels...
        ],
        "transportationTips": "Include any transportation tips here",
        "additionalNotes": "Any additional notes or recommendations"
      }
      
      Please ensure the itinerary is realistic, enjoyable, and matches the user's preferences.
      Include estimated travel times between locations and appropriate time allocations.
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      console.log("AI Response:", result.response.text());

      // Parse the JSON response from the AI
      const responseText = result.response.text();
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);

      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error generating AI itinerary:", error);
      throw new Error("Failed to generate itinerary with AI");
    }
  };

  const getTotalTravelers = () => {
    return travelers.adults + travelers.children + travelers.infants;
  };

  // Map interest buttons to emojis
  const interestEmojis = {
    "Adventure Travel": "🏞️",
    "Beach Vacations": "🏖️",
    "Road Trips": "🚗",
    "Food Tourism": "🍔",
    "Art Galleries": "🖼️",
  };

  // Map budget preferences to emojis
  const budgetEmojis = {
    Budget: "💲",
    Moderate: "💲💲",
    Luxury: "💎",
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <SkeletonLoading />
        {/* <ActivityIndicator size="large" /> */}
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
                  <Text style={styles.countryName}>{tripType}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Party Section - Now with inline editing */}
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
                onClose={() => setIsTravelersDropdownOpen(false)}
              />
            </View>
          )}
        </View>

        {/* Trip Dates Section - Now with inline editing */}
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

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDates={handleDateConfirm}
        activeTab="Places" // Or whatever makes sense for your review page
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
  buildButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    margin: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  buildButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    // backgroundColor: '#f1f1f1',
  },
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
