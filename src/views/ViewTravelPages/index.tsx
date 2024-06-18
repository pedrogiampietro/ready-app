import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GeneralScreen from "./GeneralScreen";
import RestaurantsScreen from "./RestaurantsScreen";
import ItinerariesScreen from "./ItinerariesScreen";
import styles from "./styles";

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const ViewTravelPage = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const { trip } = route.params as any;

  const handleBack = () => {
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {trip.title}
        </Text>
        <Ionicons name="notifications-outline" size={24} color="#FF7029" />
      </View>

      <View style={styles.tabContainer}>
        <Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: "#FF7029" },
            tabBarActiveTintColor: "#FFF",
            tabBarIndicatorStyle: {
              backgroundColor: "#FFF",
            },
          }}
        >
          <Screen name="Geral">
            {(props) => <GeneralScreen {...props} trip={trip} />}
          </Screen>
          <Screen name="Restaurantes">
            {(props) => <RestaurantsScreen {...props} trip={trip} />}
          </Screen>
          <Screen name="Itinerários">
            {(props) => <ItinerariesScreen {...props} trip={trip} />}
          </Screen>
        </Navigator>
      </View>
    </View>
  );
};

export default ViewTravelPage;
