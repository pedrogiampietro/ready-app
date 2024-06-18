import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

const RestaurantsScreen = ({ trip }: any) => (
  <ScrollView style={{ flex: 1, padding: 16 }}>
    <Text style={styles.infoTitle}>Restaurantes</Text>
    {trip.restaurants.map((restaurant: any) => (
      <View key={restaurant.id} style={styles.restaurantCard}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantBudget}>{restaurant.budget}</Text>
        <Text style={styles.restaurantUrl}>{restaurant.url}</Text>
      </View>
    ))}
  </ScrollView>
);

export default RestaurantsScreen;
