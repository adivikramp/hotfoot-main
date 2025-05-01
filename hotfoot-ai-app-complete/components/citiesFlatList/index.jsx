import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { Dimensions } from "react-native";
import { GetPixabayImageByCityName } from "../../services/PixabayApi";
import {
  GetPlaceDetails,
  GetPlaceDetailsByTextSearch,
} from "../../services/GlobalApi";
import {
  TopPicksOnlyForYou,
  TopTrendsFromYourCityApi,
} from "../../services/AmadeusApi";
import { cityCodes } from "../../constants/iataCityCodes";
import { Link } from "expo-router";
import { hotelDetails } from "../../constants/hotels";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { HotelCard } from "../hotelCard/hotelCard";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, MapPin } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router";
import useTripSearchStore from "../../app/store/trpiSearchZustandStore";
import DatePickerModal from "../datePickerModal/datePickerModal";
import useUserStore from "../../app/store/userZustandStore";
import SkeletonLoading from "../skeletonLoading/skeletonLoading";
import { formatHotelSearchParams, searchHotels } from "../../services/SerpApi";

const fetchCitiesWithImages = async (data) => {
  // if (!data) return;
  // console.log('data: ', data)

  try {
    const citiesWithImages = await Promise.all(
      data?.map(async (city) => {
        try {
          const imageResponse = await GetPixabayImageByCityName(city.name);
          const parsedData = await JSON.parse(imageResponse);
          const image = parsedData.hits?.[0]?.largeImageURL || null;
          // console.log("citiesWithImages: ", parsedData)
          return { ...city, imageUrl: image };
        } catch (error) {
          console.error(`Failed to fetch image for ${city.name}:`, error);
          return { ...city, imageUrl: null };
        }
      })
    );
    // console.log("citiesWithImages: ", citiesWithImages)
    // setCities(citiesWithImages);
    return citiesWithImages;
  } catch (error) {
    console.error("Error fetching cities with images:", error);
  }
};

export const CityList = ({ data }) => {
  const [places, setPlaces] = useState([]);
  const navigation = useNavigation();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const {
    toLocation,
    travelers,
    setFromLocationToStore,
    setToLocationToStore,
    setDatesToStore,
    resetSearch,
  } = useTripSearchStore();

  const handleDateConfirm = async (selectedDates) => {
    console.log("selectedDates:", selectedDates);
    setDatesToStore({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
    const searchDataHotels = {
      dates: {
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        totalDays: selectedDates.totalDays,
      },
      toLocation,
      travelers,
    };

    console.log(searchDataHotels);

    try {
      const apiParams = formatHotelSearchParams(searchDataHotels);
      const hotelResults = await searchHotels(apiParams);
      navigation.navigate("place/cityDetails", {
        hotelResults: JSON.stringify(hotelResults),
        searchData: JSON.stringify({
          ...apiParams,
          check_in_date: formatDateForAPI(selectedDates.startDate),
          check_out_date: formatDateForAPI(selectedDates.endDate),
        }),
      });
      onClose();
    } catch (error) {
      console.error("Hotel search error:", error);
      Alert.alert("Error", "Failed to search for hotels. Please try again.");
    }
  };

  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handlePress = ({ toLocation }) => {
    console.log("toLocation:", toLocation);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetSearch();
    setFromLocationToStore("fromLocation");
    setToLocationToStore(toLocation);
    setIsDatePickerVisible(true);
  };

  useEffect(() => {
    fetchData();
    // console.log('places:', places)
  }, []);

  const fetchData = async () => {
    try {
      const popularDestinations = await GetPlaceDetailsByTextSearch();
      // console.log('popularDestinations:', JSON.stringify(popularDestinations.results, null, 2));
      const citiesWithImages = await fetchCitiesWithImages(
        popularDestinations.results
      );
      // console.log('popularDestinations:', citiesWithImages);
      setPlaces(citiesWithImages);
      // setPlaces(popularDestinations.results);
    } catch (error) {
      console.error("Error during fetching city list:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex items-center justify-center"
      style={{ marginRight: 10 }}
      onPress={() =>
        handlePress({
          toLocation: {
            name: item?.name,
            geoCode: {
              latitude: item?.geometry?.location?.lat,
              longitude: item?.geometry?.location?.lng,
            },
          },
        })
      }
    >
      {item.photos && item.photos.length > 0 && (
        <View
          style={{
            padding: 2,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              objectFit: "none",
            }}
            className="object-contain"
          />
        </View>
      )}
      <View style={{ marginVertical: 5, marginLeft: 2 }}>
        <Text className="font-normal text-lg text-gray-900">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDates={handleDateConfirm}
        activeTab={"Places"}
        tripType={"Round Trip"}
        // initialDates={dates}
      />
    </View>
  );
};

export const TopPicksCityList = ({ data }) => {
  const [cities, setCities] = useState([]);
  const navigation = useNavigation();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const {
    toLocation,
    travelers,
    setFromLocationToStore,
    setToLocationToStore,
    setDatesToStore,
    resetSearch,
  } = useTripSearchStore();

  const handleDateConfirm = async (selectedDates) => {
    console.log("selectedDates:", selectedDates);
    setDatesToStore({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });

    const searchDataHotels = {
      dates: {
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        totalDays: selectedDates.totalDays,
      },
      toLocation: toLocation.name,
      travelers,
    };

    console.log(searchDataHotels);

    try {
      const apiParams = formatHotelSearchParams(searchDataHotels);
      const hotelResults = await searchHotels(apiParams);
      navigation.navigate("place/cityDetails", {
        hotelResults: JSON.stringify(hotelResults),
        searchData: JSON.stringify({
          ...apiParams,
          check_in_date: formatDateForAPI(selectedDates.startDate),
          check_out_date: formatDateForAPI(selectedDates.endDate),
        }),
      });
      onClose();
    } catch (error) {
      console.error("Hotel search error:", error);
      Alert.alert("Error", "Failed to search for hotels. Please try again.");
    }
  };

  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handlePress = ({ toLocation }) => {
    console.log("toLocation:", toLocation);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetSearch();
    setFromLocationToStore("fromLocation");
    setToLocationToStore(toLocation);
    setIsDatePickerVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const topPicks = await TopPicksOnlyForYou();
      const citiesWithImages = await fetchCitiesWithImages(topPicks.data.data);
      setCities(citiesWithImages);
    } catch (error) {
      console.error("Error during fetching top picks city list:", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.trendingContainer}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <TouchableOpacity
          key={item.imageUrl}
          style={styles.destinationCard}
          onPress={() =>
            handlePress({
              toLocation: { name: item?.name, geoCode: item?.geoCode },
            })
          }
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.destinationImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={styles.destinationGradient}
          />
          <View style={styles.destinationContent}>
            {/* <Text style={styles.destinationName}>{item.name}</Text> */}
            <View style={styles.destinationDetails}>
              <View style={styles.locationContainer}>
                <MapPin size={12} color="#FFFFFF" />
                <Text style={styles.destinationCountry}>{item?.name}</Text>
              </View>
              {/* <View style={styles.ratingContainer}>
                                <Heart size={12} color="#FF6B6B" fill="#FF6B6B" />
                                <Text style={styles.destinationRating}>4.5</Text>
                            </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDates={handleDateConfirm}
        activeTab={"Places"}
        tripType={"Round Trip"}
        // initialDates={dates}
      />
    </View>
  );
};

export const TopTrendsFromYourCity = ({ data }) => {
  const [cities, setCities] = useState([]);

  // console.log('TopPicksCityList console.log: ', cities)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const topTrends = await TopTrendsFromYourCityApi();
      // console.log('TopPicksOnlyForYou:',topPicks);
      const data = enrichDataWithCityNames(topTrends.data);
      // console.log('data: ', data)
      await fetchCitiesWithImages(data);
    } catch (error) {
      console.error("Error during fetching top trends city list:", error);
    }
  };

  const enrichDataWithCityNames = (apiResponse) => {
    // console.log('data enrichDataWithCityNames: ', apiResponse)
    return {
      data: apiResponse?.data?.map((item) => ({
        ...item,
        cityName: cityCodes[item.destination] || "Unknown City",
      })),
    };
  };

  const renderItem = ({ item }) => {
    // const data = GetPixabayImageByCityName(item.name)

    // console.log('GetPixabayImageByCityName console.log: ', data)

    return (
      <TouchableOpacity className="">
        {item.cityName && (
          <Image
            source={{
              uri:
                item?.imageUrl ||
                "https://pixabay.com/get/g287906a7b5515377d1ba198513b0c7e39375da25c6a28dcbdac56afe7fcd3d4a24e45abeffb17b4a0dcac2ee8c2f09a45bd25eefb4919c55c143f57d36c67e11_1280.jpg",
            }}
            style={{
              width: 250,
              height: 150,
              borderRadius: 10,
              marginRight: 10,
              objectFit: "none",
            }}
            className="object-contain"
          />
        )}
        <View style={{ marginVertical: 5, marginLeft: 2 }}>
          <Text className="font-normal text-lg text-gray-900">
            {item.cityName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={(item) => item.destination}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export const ExploreFlatList = ({ category, onLoading }) => {
  const [places, setPlaces] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { userLocation } = useUserStore();
  const width = Dimensions.get("window").width;

  const centerCoordinates = userLocation?.coordinates || fallbackCoordinates;

  // types for google api
  const body = {
    includedPrimaryTypes: [category],
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: {
          latitude: centerCoordinates.latitude,
          longitude: centerCoordinates.longitude,
        },
        radius: 15000,
      },
    },
  };

  // onLoading(true)
  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      if (category === "hotel") {
        setPlaces(hotelDetails.properties);
      } else {
        const popularDestinations = await GetPlaceDetails(body);

        setPlaces(popularDestinations.places);
      }
    } catch (error) {
      console.error("Error during ExploreFlatList city list:", error);
    }
  };

  const renderItem = ({ item }) => {
    const handlePlacePress = () => {
      if (category?.toString() !== "hotel") {
        const url = `https://www.google.com/maps/search/?api=1&query=${item.location.latitude},${item.location.longitude}`;
        Linking.openURL(url).catch((err) =>
          console.error("Failed to open Google Maps:", err)
        );
      }
    };

    return category?.toString() === "hotel" ? (
      <View>
        <HotelCard hotel={item} />
      </View>
    ) : (
      <View>
        <TouchableOpacity onPress={handlePlacePress}>
          {item.photos && item.photos.length > 0 && (
            <View>
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${
                    item.photos[0].name.split("/photos/")[1]
                  }&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACE_API_KEY}`,
                }}
                style={{
                  width: Dimensions.get("window").width - 35,
                  height: 200,
                  borderRadius: 10,
                  objectFit: "none",
                }}
                className="object-contain"
              />
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>★ {item.rating || "N/A"}</Text>
              </View>
            </View>
          )}
          <View style={{ marginVertical: 5, marginLeft: 2 }}>
            <View style={styles.container}>
              <Text style={styles.displayName}>
                {item?.displayName?.text || <SkeletonLoading />}
              </Text>
              {item.formattedAddress && (
                <View>
                  <Text style={styles.address}>{item.formattedAddress}</Text>
                  <Text style={styles.address}>Category: {category}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) =>
          Date.now().toString() + Math.random().toString(36).substring(7)
        }
        vertical={true}
        showsVerticalScrollIndicator={false}
        className="mr-5"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 30,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginTop: 20,
  },
  card: {
    borderRadius: 12, // rounded-xl
    marginBottom: 20, // p-3
    borderWidth: 1, // border
    borderColor: "#f3f4f6", // border-gray-100
    backgroundColor: "#f8f8f8",
  },
  displayName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937", // gray-900
  },
  address: {
    fontSize: 14,
    color: "#6b7280", // gray-600
    marginTop: 4,
  },
  ratingContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white", // Semi-transparent background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  ratingText: {
    color: "black", // Gold/yellow color for stars
    fontWeight: "600",
    fontSize: 16,
  },
  aminityContainer: {
    backgroundColor: "#f1f1f1", // Semi-transparent background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 7,
    marginTop: 7,
  },
  aminityText: {
    color: "black", // Gold/yellow color for stars
    fontWeight: "600",
    fontSize: 12,
  },
  viewDetails: {
    backgroundColor: "black", // Semi-transparent background
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 7,
    marginTop: 7,
  },
  viewDetailsText: {
    color: "white", // Semi-transparent background
    fontWeight: "bold",
  },
  viewDealContainer: {
    display: "flex", // Semi-transparent background
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  reviewCount: {
    color: "#fff", // gray-600
    fontSize: 14,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  websiteButton: {
    backgroundColor: "#3b82f6", // blue-500
  },
  mapsButton: {
    backgroundColor: "#1f2937", // gray-800
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    // marginBottom: 24,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  priceSubtext: {
    fontSize: 14,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  trendingContainer: {
    // marginBottom: 20,
  },
  destinationCard: {
    width: 150,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    // marginLeft: 5,
    // marginBottom: 10,
    position: "relative",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  destinationGradient: {
    position: "absolute",
    width: "100%",
    height: "70%",
    bottom: 0,
    zIndex: 1,
  },
  destinationContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    zIndex: 2,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  destinationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationCountry: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
  ratingStarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationRating: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
});
