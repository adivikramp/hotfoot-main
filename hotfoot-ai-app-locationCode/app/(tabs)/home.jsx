import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/topBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ExploreFlatList,
  TopPicksCityList,
} from "../../components/citiesFlatList";
import ExploreHeader from "../../components/flatLists";
import AnimatedExploreBar from "../../components/animatedExploreBar";
import ExploreCategory from "../../components/animatedExploreBar/exploreCategory";
import { SearchModal } from "../../components/animatedExploreBar/SearchModal";

const HomeScreen = () => {
  const [category, setCategory] = useState("hotel");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchModalVisible(true);
  };

  const onDataChanged = (category) => {
    setCategory(category);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <TopBar logo text={"Hotfoot"} />
      <View className="flex container pl-5 mb-28">
        <View className="mb-5">
          <AnimatedExploreBar />
        </View>

        <ScrollView
          vertical
          className="flex container mb-28 h-full "
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <ExploreCategory />
          <View>
            <View className="mb-5 mx-1 flex-row justify-between">
              <Text className="subpixel-antialiased text-lg font-bold">
                Popular Destinations
              </Text>
              <View className="flex-row items-center mr-3">
                <Text>View All</Text>
                <AntDesign
                  className="ml-3 font-thin"
                  name="arrowright"
                  size={20}
                  color="black"
                />
              </View>
            </View>
            <View>
              {/* <CityList data={cities} /> */}
              {/* <CityList /> */}
            </View>
          </View>
          <View>
            <View className="my-5 mx-1 flex-row justify-between">
              <Text className="subpixel-antialiased text-lg font-bold">
                Top picks for you
              </Text>
              <View className="flex-row items-center mr-3">
                <Text>View All</Text>
                <AntDesign
                  className="ml-3 font-thin"
                  name="arrowright"
                  size={20}
                  color="black"
                />
              </View>
            </View>
            <View>
              {/* <TopPicksCityList data={topPicksCities.data} /> */}
              <TopPicksCityList />
            </View>
          </View>
          {/* <View>
            <View className="my-5 mx-1 flex-row justify-between">
              <Text className="subpixel-antialiased text-lg font-bold">
                Top trends from your city
              </Text>
              <View className="flex-row items-center mr-3">
                <Text>View All</Text>
                <AntDesign className="ml-3 font-thin" name="arrowright" size={20} color="black" />
              </View>
            </View>
            <View>
              <TopTrendsFromYourCity />
            </View>
          </View> */}

          <SearchModal
            visible={searchModalVisible}
            onClose={() => setSearchModalVisible(false)}
            tabName="Places" // or "Flights" depending on your needs
          />

          <View>
            <View>
              <ExploreHeader onCategoryChanged={onDataChanged} />
              <ExploreFlatList category={category} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
