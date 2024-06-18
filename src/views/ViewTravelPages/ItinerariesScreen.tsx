import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import { formatDate } from "../../utils";

const ItinerariesScreen = ({ trip }: any) => (
  <ScrollView style={{ flex: 1, padding: 16 }}>
    <Text style={styles.infoTitle}>Itinerários</Text>
    {trip.itineraries.map((itinerary: any) => (
      <View key={itinerary.id} style={styles.itineraryCard}>
        <Text style={styles.itineraryActivity}>{itinerary.activity}</Text>
        <Text style={styles.itineraryDate}>{formatDate(itinerary.date)}</Text>
        <Text style={styles.itineraryDescription}>{itinerary.description}</Text>
      </View>
    ))}
  </ScrollView>
);

export default ItinerariesScreen;
