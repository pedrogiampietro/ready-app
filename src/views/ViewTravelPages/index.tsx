import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import GeneralScreen from "./GeneralScreen";
import RestaurantsScreen from "./RestaurantsScreen";
import ItinerariesScreen from "./ItinerariesScreen";
import styles from "./styles";
import { apiClient } from "../../services/api";

export const ViewTravelPage = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const { trip } = route.params as any;

  const [updatedTrip, setUpdatedTrip] = useState(trip);
  const [activeTab, setActiveTab] = useState("Geral");

  const handleBack = () => {
    navigation.navigate("HomeTabs");
  };

  const updateTrip = (newTripData: any) => {
    setUpdatedTrip({ ...updatedTrip, ...newTripData });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Geral":
        return <GeneralScreen trip={updatedTrip} updateTripData={updateTrip} />;
      case "Restaurantes":
        return <RestaurantsScreen trip={updatedTrip} />;
      case "Itinerários":
        return <ItinerariesScreen trip={updatedTrip} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.infoTitle} numberOfLines={1} ellipsizeMode="tail">
          {updatedTrip.title}
        </Text>
        <Ionicons name="notifications-outline" size={24} color="#FF7029" />
      </View>

      <View style={styles.tabContainer}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab("Geral")}
          >
            <Text
              style={
                activeTab === "Geral" ? styles.activeTabText : styles.tabText
              }
            >
              Geral
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab("Restaurantes")}
          >
            <Text
              style={
                activeTab === "Restaurantes"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              Restaurantes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab("Itinerários")}
          >
            <Text
              style={
                activeTab === "Itinerários"
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              Itinerários
            </Text>
          </TouchableOpacity>
        </View>
        {renderActiveTab()}
      </View>
    </View>
  );
};

export default ViewTravelPage;
