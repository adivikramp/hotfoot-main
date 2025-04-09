import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { flightDetailsStep3 } from "../../constants/flights";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/topBar";
import { AntDesign } from "@expo/vector-icons";

const BookingOptions = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    if (params.bookingToken && params.flightData) {
      try {
        setSelectedFlight(JSON.parse(params.flightData));
        setBookingOptions(flightDetailsStep3[0].booking_options);
      } catch (e) {
        console.error("Error parsing flight data:", e);
      }
      setLoading(false);
    }
  }, [params.bookingToken, params.flightData]);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleBookOption = (bookingOption) => {
    if (
      bookingOption.together?.booking_request?.url &&
      bookingOption.together?.booking_request?.post_data
    ) {
      const bookingUrl = `${bookingOption.together.booking_request.url}?${bookingOption.together.booking_request.post_data}`;
      Linking.openURL(bookingUrl).catch((err) => {
        console.error("Failed to open booking URL:", err);
        alert("Failed to open booking page");
      });
    } else {
      Linking.openURL(flightDetailsStep3[0].search_metadata.google_flights_url);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!selectedFlight || bookingOptions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBar logo text="Booking Options" onBack={() => router.back()} />
        <Text style={styles.errorText}>No booking options available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar logo text="Booking Options" onBack={() => router.back()} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.routeText}>
            {selectedFlight.flights[0].departure_airport.id} →{" "}
            {
              selectedFlight.flights[selectedFlight.flights.length - 1]
                .arrival_airport.id
            }
          </Text>
          <Text style={styles.totalDuration}>
            Total Duration: {formatDuration(selectedFlight.total_duration)}
          </Text>
          <Text style={styles.priceText}>${selectedFlight.price}</Text>
        </View>

        <View style={styles.priceInsights}>
          <Text style={styles.priceRange}>
            Typical Price Range: $
            {flightDetailsStep3[0].price_insights.typical_price_range[0]} - $
            {flightDetailsStep3[0].price_insights.typical_price_range[1]}
          </Text>
          <Text style={styles.lowestPrice}>
            Lowest Price: ${flightDetailsStep3[0].price_insights.lowest_price}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Available Booking Options</Text>

        {bookingOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => handleBookOption(option)}
          >
            <View style={styles.optionHeader}>
              {option.together.airline_logos?.map((logo, i) => (
                <Image
                  key={i}
                  source={{ uri: logo }}
                  style={styles.airlineLogo}
                />
              ))}
              <Text style={styles.optionPrice}>${option.together.price}</Text>
            </View>

            <Text style={styles.optionProvider}>
              Book with: {option.together.book_with}
            </Text>

            {option.together.marketed_as && (
              <Text style={styles.flightNumbers}>
                Flights: {option.together.marketed_as.join(", ")}
              </Text>
            )}

            {option.together.baggage_prices && (
              <Text style={styles.baggageInfo}>
                Baggage: {option.together.baggage_prices.join(", ")}
              </Text>
            )}

            <View style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Book Now</Text>
              <AntDesign name="arrowright" size={16} color="#0066cc" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "#f5f9ff",
    borderRadius: 8,
    marginVertical: 16,
    alignItems: "center",
  },
  routeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
  },
  totalDuration: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066cc",
    marginTop: 8,
  },
  priceInsights: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  priceRange: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  lowestPrice: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  airlineLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  optionPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
  },
  optionProvider: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  flightNumbers: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  baggageInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  bookNowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  bookNowText: {
    color: "#0066cc",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default BookingOptions;
