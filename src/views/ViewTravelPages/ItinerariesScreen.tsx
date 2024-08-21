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
import { formatDate } from "../../utils";
import { apiClient } from "../../services/api";

const ItinerariesScreen = ({ trip, updateTripData }: any) => {
  const [newItinerary, setNewItinerary] = useState({
    date: "",
    activity: "",
    description: "",
    url: "",
  });

  const handleAddItinerary = async () => {
    if (
      !newItinerary.date ||
      !newItinerary.activity ||
      !newItinerary.description
    ) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    // Converter a data para ISO-8601
    const [day, month, year] = newItinerary.date.split("/");
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    const itineraryData = {
      ...newItinerary,
      date: isoDate, // Usar a data no formato ISO-8601
    };

    try {
      const api = await apiClient();
      const response = await api.post(
        `/trips/${trip.id}/itineraries`,
        itineraryData
      );
      updateTripData({
        itineraries: [...trip.itineraries, response.data],
      });
      setNewItinerary({ date: "", activity: "", description: "", url: "" });
      Alert.alert("Sucesso", "Itinerário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar itinerário:", error);
      Alert.alert("Erro", "Não foi possível adicionar o itinerário.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={styles.infoTitle}>Itinerários</Text>
      {trip.itineraries.map((itinerary: any) => (
        <View key={itinerary.id} style={styles.itineraryCard}>
          <Text style={styles.itineraryActivity}>{itinerary.activity}</Text>
          <Text style={styles.itineraryDate}>{formatDate(itinerary.date)}</Text>
          <Text style={styles.itineraryDescription}>
            {itinerary.description}
          </Text>
        </View>
      ))}
      <View style={styles.addItineraryForm}>
        <TextInput
          style={styles.input}
          placeholder="Data (DD/MM/AAAA)"
          value={newItinerary.date}
          onChangeText={(text) =>
            setNewItinerary({ ...newItinerary, date: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Atividade"
          value={newItinerary.activity}
          onChangeText={(text) =>
            setNewItinerary({ ...newItinerary, activity: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={newItinerary.description}
          onChangeText={(text) =>
            setNewItinerary({ ...newItinerary, description: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="URL"
          value={newItinerary.url}
          onChangeText={(text) =>
            setNewItinerary({ ...newItinerary, url: text })
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItinerary}>
          <Text style={styles.addButtonText}>Adicionar Itinerário</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ItinerariesScreen;
