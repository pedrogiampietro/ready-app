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

  const deleteTripFromState = (tripId: string) => {
    setUpdatedTrip((prevTrips: any[]) =>
      prevTrips.filter((t) => t.id !== tripId)
    );
  };

  const handleDeleteTrip = async (tripId: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta viagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await apiClient().delete(`/trips/${tripId}`);
              deleteTripFromState(tripId);
              Alert.alert("Sucesso", "Viagem excluída com sucesso!");
              handleBack(); // Volta para a tela anterior após a exclusão
            } catch (error) {
              console.error("Erro ao excluir viagem:", error);
              Alert.alert("Erro", "Não foi possível excluir a viagem.");
            }
          },
        },
      ]
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Geral":
        return (
          <GeneralScreen
            trip={updatedTrip}
            updateTripData={updateTrip}
            deleteTripFromState={deleteTripFromState}
          />
        );
      case "Restaurantes":
        return <RestaurantsScreen trip={updatedTrip} />;
      case "Itinerários":
        return <ItinerariesScreen trip={updatedTrip} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log("Tab ativa mudou para:", activeTab);
  }, [activeTab]);

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
