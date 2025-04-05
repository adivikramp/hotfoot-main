import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions
} from 'react-native';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import {
  ChevronLeft,
  Info,
  ChevronDown,
  ChevronUp,
  Sun,
  Cloud,
  Star,
  StarHalf
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HotelCard } from '../../components/hotelCard/hotelCard';
import { hotelDetails } from "../../constants/hotels"
import useTripSearchStore from '../store/trpiSearchZustandStore';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 350;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function ExploreScreen() {
  
  const [selectedTab, setSelectedTab] = useState('All');
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const scrollY = useSharedValue(0);
  const { toLocation, fromLocation, travelers, getTotalTravelers, dates } = useTripSearchStore();
  console.log("travelers: ", dates);

  const hotelData = [
    {
      name: 'LATICOUPE Jacobs Inn Dublin',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
      rating: 4.2,
      reviews: '1.1K',
      price: '64',
      originalPrice: '89',
      location: 'Dublin City Centre - 0.5 mi from center',
      amenities: ['Wi-Fi', 'Breakfast', 'Parking'],
      verified: true,
      recommended: true
    },
    {
      name: 'The Plaza Hotel',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
      rating: 4.5,
      reviews: '1.1K',
      price: '76',
      originalPrice: '105',
      discount: 28,
      location: 'Temple Bar - 0.2 mi from center',
      amenities: ['Pool', 'Spa', 'Restaurant'],
      verified: true
    },
    {
      name: 'Premier Inn Dublin City Centre',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop',
      rating: 4.8,
      reviews: '2.3K',
      price: '82',
      location: 'Grafton Street - 0.3 mi from center',
      amenities: ['Gym', 'Breakfast', 'Bar'],
      recommended: true
    }
  ]

  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter(item => item !== index));
    } else {
      setExpandedQuestions([...expandedQuestions, index]);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [HEADER_HEIGHT, Platform.OS === 'ios' ? 100 : 80],
        'clamp'
      ),
    };
  });

  const headerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT / 2], [1, 0], 'clamp'),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -20],
            'clamp'
          ),
        },
      ],
    };
  });

  const questions = [
    'Is Dublin worth visiting?',
    'Is Dublin an expensive place to visit?',
    'What to do in Ireland in 3 days?',
    'What to know before going to Dublin?',
    'Where to visit from Dublin?'
  ];

  const weatherData = [
    { month: 'March', high: '11°', low: '4°', popularity: 60 },
    { month: 'April', high: '13°', low: '5°', popularity: 75 },
    { month: 'May', high: '16°', low: '7°', popularity: 40 }
  ];

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <AnimatedImage
            source={{ uri: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.headerImage}
          />
          <AnimatedLinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[styles.headerGradient, headerTextStyle]}
          >
            <Animated.Text style={[styles.cityName, headerTextStyle]}>
              {toLocation.name}
            </Animated.Text>
            <Animated.Text style={[styles.countryName, headerTextStyle]}>
              It's a {dates.totalDays} days trip
            </Animated.Text>
            {/* <Animated.Text style={[styles.countryName, headerTextStyle]}>
              {getTotalTravelers()} travelers from {fromLocation.name}
            </Animated.Text> */}
            <Animated.Text style={[styles.dateRange, headerTextStyle]}>
              {dates.startDate} - {dates.endDate}
            </Animated.Text>
          </AnimatedLinearGradient>
        </Animated.View>

        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Travel Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 300 }}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Travel from {fromLocation.name}</Text>
              <Info size={20} color="#666" />
            </View>

            <TouchableOpacity style={styles.priceAlert}>
              <Text style={styles.priceAlertText}>Prices are currently typical</Text>
              {/* <ChevronDown size={20} color="#666" /> */}
            </TouchableOpacity>

            {/* Flight Options */}
            {[
              { airline: 'Ryanair', duration: '1h 25m', route: 'LTN-DUB', price: '£30' },
              { airline: 'Ryanair', duration: '1h 25m', route: 'LGW-DUB', price: '£54' },
              { airline: 'Ryanair', duration: '1h 15m', route: 'LTN-DUB', price: '£68' }
            ].map((flight, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 400 + index * 100 }}
                style={styles.flightOption}
              >
                <View style={styles.flightInfo}>
                  <View style={styles.airlineLogo}>
                    <Text style={styles.airlineInitial}>R</Text>
                  </View>
                  <View>
                    <Text style={styles.airlineName}>{flight.airline}</Text>
                    <Text style={styles.flightDetails}>
                      Non-stop · {flight.duration} · {flight.route}
                    </Text>
                  </View>
                </View>
                <View style={styles.priceInfo}>
                  <Text style={styles.priceText}>{flight.price}</Text>
                  <Text style={styles.priceSubtext}>Round trip</Text>
                </View>
              </MotiView>
            ))}

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View all flights</Text>
            </TouchableOpacity>
          </MotiView>

          {/* Stays Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500 }}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Stays</Text>
              <Info size={20} color="#666" />
            </View>

            <Text style={styles.stayDates}>27 Mar - 2 Apr · 6 nights</Text>

            <View style={styles.stayTypes}>
              {['Hotels', 'Holiday rentals'].map((type, index) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedTab(tab)}
                  style={[
                    styles.stayTypeButton,
                    index === 0 && styles.activeStayType
                  ]}
                >
                  <Text
                    style={[
                      styles.stayTypeText,
                      index === 0 && styles.activeStayTypeText
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hotel Cards */}
            <View style={styles.hotelCardsContainer}>
              {hotelDetails?.properties?.slice(0, 3).map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))}
            </View>

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View {hotelDetails?.search_information?.total_results}+ hotels</Text>
            </TouchableOpacity>
          </MotiView>

          {/* When to Visit Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 700 }}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>When to visit</Text>
            <Text style={styles.sectionSubtitle}>
              Get tips for the best time to go
            </Text>

            <View style={styles.seasons}>
              <View style={styles.seasonCard}>
                <View style={styles.seasonIcon}>
                  <Sun size={24} color="#000" />
                </View>
                <Text style={styles.seasonTitle}>Peak season</Text>
                <Text style={styles.seasonPeriod}>Jul - Oct</Text>
                <Text style={styles.seasonDescription}>
                  Most popular and higher prices
                </Text>
              </View>

              <View style={styles.seasonCard}>
                <View style={styles.seasonIcon}>
                  <Cloud size={24} color="#000" />
                </View>
                <Text style={styles.seasonTitle}>Off-season</Text>
                <Text style={styles.seasonPeriod}>Jan - Feb, Apr</Text>
                <Text style={styles.seasonDescription}>
                  Less popular and lower prices
                </Text>
              </View>
            </View>

            <View style={styles.weatherSection}>
              <View style={styles.weatherHeader}>
                <Text style={styles.weatherLabel}>HIGH / LOW</Text>
                <Text style={styles.weatherLabel}>POPULARITY</Text>
              </View>

              {weatherData.map((data, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: 800 + index * 100 }}
                  style={styles.weatherRow}
                >
                  <Text style={styles.monthText}>{data.month}</Text>
                  <Text style={styles.temperatureText}>
                    {data.high} / {data.low}
                  </Text>
                  <View style={styles.popularityBar}>
                    <MotiView
                      from={{ width: '0%' }}
                      animate={{ width: `${data.popularity}%` }}
                      transition={{ type: 'timing', duration: 1000, delay: 900 + index * 100 }}
                      style={[styles.popularityFill]}
                    />
                  </View>
                </MotiView>
              ))}
            </View>
          </MotiView>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What people ask</Text>
            <Text style={styles.sectionSubtitle}>
              See popular questions from Google Search
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tabsContainer}
            >
              {['All', 'Travel requirements', 'Costs', 'Getting around'].map(
                (tab, index) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    style={[
                      styles.tab,
                      selectedTab === tab && styles.activeTab
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        selectedTab === tab && styles.activeTabText
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>

            <View style={styles.questions}>
              {questions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleQuestion(index)}
                  style={styles.questionItem}
                >
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionText}>{question}</Text>
                    {expandedQuestions.includes(index) ? (
                      <ChevronUp size={20} color="#666" />
                    ) : (
                      <ChevronDown size={20} color="#666" />
                    )}
                  </View>
                  <AnimatePresence>
                    {expandedQuestions.includes(index) && (
                      <MotiView
                        from={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={styles.answerContainer}
                      >
                        <Text style={styles.answerText}>
                          This is a placeholder answer for "{question}". Tap to collapse.
                        </Text>
                      </MotiView>
                    )}
                  </AnimatePresence>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View more questions</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLinks}>
              {['About', 'Privacy', 'Terms'].map((link, index) => (
                <Text key={index} style={styles.footerLink}>
                  {link}
                </Text>
              ))}
            </View>

            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackText}>Feedback</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Displayed currencies may differ from the currencies used to purchase
              flights and hotels. Learn more.
            </Text>

            <Text style={styles.disclaimer}>
              Prices are final and include all taxes and fees. Additional charges
              may apply for other types of payment or luggage. Prices and
              availability are not guaranteed.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    justifyContent: 'flex-end',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section: {
    // borderRadius: 54,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  priceAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceAlertText: {
    fontSize: 16,
    color: '#000000',
  },
  flightOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  flightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  airlineInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  flightDetails: {
    fontSize: 14,
    color: '#666666',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  priceSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  viewMoreButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  stayDates: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  stayTypes: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stayTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  activeStayType: {
    backgroundColor: '#000000',
  },
  stayTypeText: {
    fontSize: 16,
    color: '#666666',
  },
  activeStayTypeText: {
    color: '#ffffff',
  },
  hotelCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  hotelImage: {
    width: '100%',
    height: 200,
  },
  hotelInfo: {
    padding: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
  },
  hotelPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  seasons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  seasonCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  seasonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  seasonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  seasonPeriod: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  seasonDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  weatherSection: {
    marginTop: 24,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  weatherLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthText: {
    width: 80,
    fontSize: 16,
    color: '#000000',
  },
  temperatureText: {
    width: 100,
    fontSize: 16,
    color: '#000000',
  },
  popularityBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  popularityFill: {
    height: '100%',
    backgroundColor: '#666666',
    borderRadius: 4,
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#ffffff',
  },
  questions: {
    marginBottom: 20,
  },
  questionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginRight: 16,
  },
  answerContainer: {
    marginTop: 12,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  answerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  footerLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    color: '#666666',
    marginRight: 16,
  },
  feedbackButton: {
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 14,
    color: '#666666',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
    lineHeight: 18,
  },
  hotelCardsContainer : {
      // paddingHorizontal: 6,
      marginTop: 16,
    }
});