import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { flightDetailsStep1 } from "../../constants/flights";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/topBar";

const FlightDetails = () => {
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("best");

  async function getFlights() {
    setLoading(true);
    const data = flightDetailsStep1[0];
    setFlights({
      best: data.best_flights || [],
      other: data.other_flights || [],
    });
    setLoading(false);
  }

  const handleFlightPress = (flight) => {
    router.push({
      pathname: "/flightDetails/selectedFlight",
      params: { flightData: JSON.stringify(flight) },
    });
  };

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

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar logo text={"Available Flights"} />
      <View style={styles.searchSummary}>
        <Text style={styles.summaryText}>
          {flightDetailsStep1[0].search_parameters.departure_id} →{" "}
          {flightDetailsStep1[0].search_parameters.arrival_id}
        </Text>
        <Text style={styles.summaryDate}>
          {new Date(
            flightDetailsStep1[0].search_parameters.outbound_date
          ).toDateString()}{" "}
          -
          {new Date(
            flightDetailsStep1[0].search_parameters.return_date
          ).toDateString()}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "best" && styles.activeTab]}
          onPress={() => setActiveTab("best")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "best" && styles.activeTabText,
            ]}
          >
            Best Flights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "other" && styles.activeTab]}
          onPress={() => setActiveTab("other")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "other" && styles.activeTabText,
            ]}
          >
            Other Options
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.priceInsights}>
        <Text style={styles.priceText}>
          Lowest Price: ${flightDetailsStep1[0].price_insights.lowest_price}
        </Text>
        <Text style={styles.priceRange}>
          Typical Range: $
          {flightDetailsStep1[0].price_insights.typical_price_range[0]} - $
          {flightDetailsStep1[0].price_insights.typical_price_range[1]}
        </Text>
      </View>

      {/* Flights List */}
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        ) : flights[activeTab]?.length === 0 ? (
          <Text style={styles.noFlightsText}>No flights found.</Text>
        ) : (
          flights[activeTab]?.map((flight, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleFlightPress(flight)}
              style={styles.flightCard}
            >
              <View style={styles.airlineInfo}>
                <Image
                  source={{ uri: flight.airline_logo }}
                  style={styles.airlineLogo}
                />
                <Text style={styles.airlineName}>
                  {flight.flights[0].airline}
                </Text>
                <Text style={styles.flightClass}>
                  {flight.flights[0].travel_class}
                </Text>
              </View>

              {flight.flights.map((segment, segIndex) => (
                <View key={segIndex} style={styles.flightSegment}>
                  <View style={styles.timeInfo}>
                    <Text style={styles.timeText}>
                      {formatTime(segment.departure_airport.time)}
                    </Text>
                    <Text style={styles.airportCode}>
                      {segment.departure_airport.id}
                    </Text>
                  </View>

                  <View style={styles.durationInfo}>
                    <Text style={styles.durationText}>
                      {formatDuration(segment.duration)}
                    </Text>
                    <View style={styles.durationLine} />
                    <Text style={styles.airplaneText}>{segment.airplane}</Text>
                  </View>

                  <View style={styles.timeInfo}>
                    <Text style={styles.timeText}>
                      {formatTime(segment.arrival_airport.time)}
                    </Text>
                    <Text style={styles.airportCode}>
                      {segment.arrival_airport.id}
                    </Text>
                  </View>
                </View>
              ))}

              {flight.layovers?.map((layover, layoverIndex) => (
                <View key={layoverIndex} style={styles.layoverInfo}>
                  <Text style={styles.layoverText}>
                    {layover.overnight ? "Overnight " : ""}Layover:{" "}
                    {formatDuration(layover.duration)} at {layover.name} (
                    {layover.id})
                  </Text>
                </View>
              ))}

              <View style={styles.footerInfo}>
                <Text style={styles.totalDuration}>
                  Total: {formatDuration(flight.total_duration)}
                </Text>
                <Text style={styles.price}>${flight.price}</Text>
              </View>

              <View style={styles.carbonInfo}>
                <Text style={styles.carbonText}>
                  Carbon:{" "}
                  {Math.round(flight.carbon_emissions.this_flight / 1000)}kg (
                  {flight.carbon_emissions.difference_percent > 0 ? "+" : ""}
                  {flight.carbon_emissions.difference_percent}%)
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchSummary: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  summaryDate: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0066cc",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  priceInsights: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceRange: {
    fontSize: 14,
    color: "#666",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loader: {
    marginTop: 20,
  },
  noFlightsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  flightCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  airlineLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  flightClass: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  flightSegment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timeInfo: {
    alignItems: "center",
    width: 80,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  airportCode: {
    fontSize: 14,
    color: "#666",
  },
  durationInfo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  durationLine: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 4,
  },
  airplaneText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  layoverInfo: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  layoverText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  footerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  totalDuration: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0066cc",
  },
  carbonInfo: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  carbonText: {
    fontSize: 12,
    color: "#666",
  },
});

export default FlightDetails;
