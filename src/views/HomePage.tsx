import React, { useEffect, useState, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AvatarStack } from "../components/AvatarStack";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { TravelCreationForm } from "../components/TravelCreationForm";
import { ImageWithSkeleton } from "../components/ImageWithSkeleton";
import { apiClient, signOut } from "../services/api";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { getInitials } from "../utils";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const { width, height } = Dimensions.get("window");
const defaultImage = require("../../assets/no-img.jpg");

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-4219531028636762~5885248154";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

interface Trip {
  id: string;
  title: string;
  banner: string;
  banner_bucket?: string;
  locationName: string;
  longitude: number;
  latitude: number;
  images: string[];
  hotelName: string;
  hotelPrice: number;
  departureDate: string;
  destinationLocation: string;
  returnDate: string;
  flightCost: number;
  mealCost: number;
  totalCost: number;
  userId: string;
  reviews: Review[];
}

interface Review {
  id: string;
  content: string;
  rating: number;
  tripId: string;
  userId: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  avatar_url: string;
  name: string;
}

export const HomePage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [lastAdTime, setLastAdTime] = useState<number | null>(null);

  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const adInterval = 2 * 60 * 1000;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const api = await apiClient();
        const response = await api.get("/trips");

        const updatedData = response.data.map((trip: Trip) => ({
          ...trip,
          banner: trip.banner
            ? trip.banner
            : Image.resolveAssetSource(defaultImage).uri,
          images: trip.images.map(
            (image) => `https://ready-api.vercel.app/${image}`
          ),
        }));

        setTrips(updatedData);
      } catch (error: any) {
        setError(error);
        signOut();
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [refresh, isFocused]);

  useEffect(() => {
    // Verifica se o usuário não é 'pro'
    if (user?.planId !== "pro-plan-id") {
      const showAd = () => {
        const currentTime = new Date().getTime();

        if (!lastAdTime || currentTime - lastAdTime >= adInterval) {
          const unsubscribe = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
              interstitial.show();
            }
          );

          interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setLastAdTime(currentTime);
          });

          interstitial.load();

          return () => {
            unsubscribe();
          };
        }
      };

      const adTimeout = setTimeout(showAd, adInterval);

      return () => {
        clearTimeout(adTimeout);
      };
    }
  }, [user, lastAdTime]);

  const handleRedirectDetail = (trip: Trip) => {
    navigation.navigate("TravelDetailPage", { trip });
  };

  const handleProfileRedirect = () => {
    navigation.navigate("ProfilePage");
  };

  if (loading) {
    return (
      <View style={styles.containerErrorWithLoading}>
        <Loading color="#FF7029" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerErrorWithLoading}>
        <Text style={styles.errorText}>
          Error fetching trips: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfileRedirect}>
          <View style={styles.avatarContainer}>
            {user?.avatar_url || user?.bucket_url ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: user?.avatar_url
                    ? `https://ready-api.vercel.app/tmp/${user?.avatar_url}`
                    : user?.bucket_url,
                }}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>
                  {getInitials(user?.name || "User")}
                </Text>
              </View>
            )}
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
        </TouchableOpacity>
        <TravelCreationForm updateCallbackTrips={setRefresh} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Explore o mundo {"  "}
          <Text style={styles.highlight}> bonito</Text> !
        </Text>
        <View style={styles.lineContainer}>
          <Image source={require("../../assets/onboard-line.png")} />
        </View>
      </View>

      <View style={styles.sliderHeader}>
        <Text style={styles.sliderTitle}>As melhores viagens</Text>
        <Text style={styles.viewAll}>Ver tudo</Text>
      </View>

      <ScrollView
        horizontal
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
      >
        {trips.map((trip: Trip) => (
          <TouchableOpacity
            key={trip.id}
            onPress={() => handleRedirectDetail(trip)}
          >
            <View style={styles.card}>
              <ImageWithSkeleton
                uri={trip.banner ? trip.banner : trip.banner_bucket}
                width={238}
                height={288}
                borderRadius={10}
              />
              <Text style={styles.cardTitle}>{trip.title}</Text>
              <View style={styles.locationContainer}>
                <View style={styles.locationGroup}>
                  <Ionicons name="location-outline" size={14} color="#22172A" />
                  <Text style={styles.locationText}>
                    {trip.destinationLocation}
                  </Text>
                </View>
                <View style={styles.likesContainer}>
                  <View style={styles.avatarsContainer}>
                    {trip.reviews.length > 0 ? (
                      <Fragment>
                        <AvatarStack
                          avatars={trip.reviews.map(
                            (review: Review) => review.user?.avatar_url
                          )}
                        />
                        {trip.reviews.length > 3 ? (
                          <Text style={styles.likesText}>
                            +{trip.reviews.length}
                          </Text>
                        ) : (
                          <Text></Text>
                        )}
                      </Fragment>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerErrorWithLoading: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF7029",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 0.05 * height,
  },
  subTextContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0.05 * width,
    marginTop: 0.05 * height,
    color: "#7D848D",
    fontSize: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  highlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7029",
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0.2 * width,
  },
  sliderContainer: {
    flex: 1,
    marginTop: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: "#FF7029",
  },
  card: {
    width: 238,
    height: "100%",
    maxHeight: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 20,
  },
  cardImage: {
    width: "100%",
    height: "80%",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginLeft: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  locationGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#7D848D",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatarsContainer: {
    flexDirection: "row",
  },
  likesText: {
    fontSize: 14,
    marginLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default HomePage;
