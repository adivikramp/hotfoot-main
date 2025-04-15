import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import TopBar from "../../components/topBar";
import { getJourneyDetails } from "../../services/SerpApi";

const BookingOptions = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [bookingData, setBookingData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOneWay, setIsOneWay] = useState(false);

  useEffect(() => {
    const fetchBookingOptions = async () => {
      try {
        setLoading(true);

        const oneWay = !params.returnFlight;
        setIsOneWay(oneWay);

        const outboundFlight = JSON.parse(params.outboundFlight);
        const returnFlight = oneWay ? null : JSON.parse(params.returnFlight);
        const searchParams = JSON.parse(params.searchParams);

        const response = await getJourneyDetails({
          departureId: searchParams.departure_id,
          arrivalId: searchParams.arrival_id,
          outboundDate: searchParams.outbound_date,
          returnDate: searchParams.return_date,
          bookingToken: params.bookingToken,
          type: searchParams.type,
        });

        if (!response || !response.booking_options) {
          throw new Error("No booking options available");
        }

        setBookingData({
          outbound: outboundFlight,
          return: returnFlight,
          booking_options: response.booking_options,
          search_metadata: response.search_metadata,
        });
      } catch (error) {
        console.error("Error fetching booking options:", error);
        Alert.alert("Error", error.message || "Failed to load booking options");
      } finally {
        setLoading(false);
      }
    };

    if (params.bookingToken) {
      fetchBookingOptions();
    }
  }, [params.bookingToken]);

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

  const handleBookNow = () => {
    if (!bookingData || !bookingData.booking_options[selectedOption]) return;

    const option = bookingData.booking_options[selectedOption];
    const bookingOption = option.together || option;

    try {
      const fullUrl = `${bookingOption.booking_request.url}?${bookingOption.booking_request.post_data}`;

      Linking.openURL(fullUrl).catch((err) => {
        console.error("Failed to open booking URL:", err);
        Alert.alert("Error", "Could not open booking page");
      });
    } catch (error) {
      console.error("Error constructing booking URL:", error);
      Alert.alert("Error", "Failed to process booking request");
    }
  };

  const renderFlightCard = (flight, title) => (
    <View style={styles.flightCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      {flight.flights.map((segment, index) => (
        <View key={index} style={styles.segment}>
          <View style={styles.airlineInfo}>
            <Image
              source={{ uri: segment.airline_logo }}
              style={styles.airlineLogo}
            />
            <Text style={styles.airlineName}>{segment.airline}</Text>
            <Text style={styles.flightNumber}>{segment.flight_number}</Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.timePlace}>
              <Text style={styles.time}>
                {formatTime(segment.departure_airport.time)}
              </Text>
              <Text style={styles.airportCode}>
                {segment.departure_airport.id}
              </Text>
            </View>

            <View style={styles.duration}>
              <Text style={styles.durationText}>
                {formatDuration(segment.duration)}
              </Text>
              <View style={styles.durationLine} />
              <Text style={styles.aircraft}>{segment.airplane}</Text>
            </View>

            <View style={styles.timePlace}>
              <Text style={styles.time}>
                {formatTime(segment.arrival_airport.time)}
              </Text>
              <Text style={styles.airportCode}>
                {segment.arrival_airport.id}
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.flightFooter}>
        <Text style={styles.totalDuration}>
          Total: {formatDuration(flight.total_duration)}
        </Text>
        <Text style={styles.price}>${flight.price}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </SafeAreaView>
    );
  }

  if (!bookingData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No booking options available</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Select Different Flights</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar logo text="Booking Options" onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Selected Flights */}
        <Text style={styles.sectionHeader}>Your Selected Flights</Text>
        {renderFlightCard(bookingData.outbound, "Outbound Flight")}
        {!isOneWay && renderFlightCard(bookingData.return, "Return Flight")}

        {/* Booking Options */}
        <Text style={styles.sectionHeader}>Booking Options</Text>
        {bookingData.booking_options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              selectedOption === index && styles.selectedOptionCard,
            ]}
            onPress={() => setSelectedOption(index)}
          >
            <View style={styles.optionHeader}>
              <View style={styles.providerInfo}>
                {option.together?.airline_logos?.map((logo, i) => (
                  <Image
                    key={i}
                    source={{ uri: logo }}
                    style={styles.optionLogo}
                  />
                ))}
                <Text style={styles.providerName}>
                  {option.together?.book_with || "Multiple Airlines"}
                </Text>
              </View>
              <Text style={styles.optionPrice}>${option.together?.price}</Text>
            </View>

            {option.together?.marketed_as && (
              <Text style={styles.flightNumbers}>
                {option.together.marketed_as.join(" + ")}
              </Text>
            )}

            {option.together?.baggage_prices && (
              <Text style={styles.baggageInfo}>
                Baggage: {option.together.baggage_prices.join(", ")}
              </Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  flightCard: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#0066cc",
  },
  segment: {
    marginBottom: 16,
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  airlineLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  flightNumber: {
    fontSize: 14,
    color: "#666",
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timePlace: {
    alignItems: "center",
    width: "30%",
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  airportCode: {
    fontSize: 16,
    color: "#0066cc",
    fontWeight: "bold",
  },
  duration: {
    alignItems: "center",
    width: "40%",
  },
  durationText: {
    fontSize: 12,
    color: "#666",
  },
  durationLine: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 4,
  },
  aircraft: {
    fontSize: 12,
    color: "#666",
  },
  flightFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
    marginTop: 8,
  },
  totalDuration: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066cc",
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOptionCard: {
    borderColor: "#0066cc",
    backgroundColor: "#f5f9ff",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  providerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0066cc",
  },
  flightNumbers: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  baggageInfo: {
    fontSize: 14,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 5,
    alignSelf: "center",
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookingOptions;
