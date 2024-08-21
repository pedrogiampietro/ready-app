import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import styles from "./styles";
import { apiClient } from "../../services/api";

const RestaurantsScreen = ({ trip, updateTripData }: any) => {
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    url: "",
    budget: "",
  });

  const handleAddRestaurant = async () => {
    if (!newRestaurant.name || !newRestaurant.url || !newRestaurant.budget) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const api = await apiClient();
      const response = await api.post(
        `/trips/${trip.id}/restaurants`,
        newRestaurant
      );
      updateTripData({
        restaurants: [...trip.restaurants, response.data],
      });
      setNewRestaurant({ name: "", url: "", budget: "" });
      Alert.alert("Sucesso", "Restaurante adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar restaurante:", error);
      Alert.alert("Erro", "Não foi possível adicionar o restaurante.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={styles.infoTitle}>Restaurantes</Text>
      {trip.restaurants.map((restaurant: any) => (
        <View key={restaurant.id} style={styles.restaurantCard}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantBudget}>{restaurant.budget}</Text>
          <Text style={styles.restaurantUrl}>{restaurant.url}</Text>
        </View>
      ))}
      <View style={styles.addRestaurantForm}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Restaurante"
          value={newRestaurant.name}
          onChangeText={(text) =>
            setNewRestaurant({ ...newRestaurant, name: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="URL"
          value={newRestaurant.url}
          onChangeText={(text) =>
            setNewRestaurant({ ...newRestaurant, url: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Orçamento"
          value={newRestaurant.budget}
          onChangeText={(text) =>
            setNewRestaurant({ ...newRestaurant, budget: text })
          }
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddRestaurant}
        >
          <Text style={styles.addButtonText}>Adicionar Restaurante</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RestaurantsScreen;
