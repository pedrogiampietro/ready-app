import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export const TravelDetailPage = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();

  const { trip } = route.params as any;

  const imagesToShow = 5;

  const handleBack = () => {
    navigation.navigate("HomeTabs");
  };

  const formattedTotalCost = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(trip.totalCost);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#FF7029", "#fba275"]} style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Viagem</Text>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
      <Image style={styles.image} source={{ uri: trip.banner }} />
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.title}>{trip.title}</Text>
          <View style={styles.cardHeader}>
            <View style={styles.textIconGroup}>
              <Ionicons name="location-outline" size={14} color="#333" />
              <Text style={styles.location}>{trip.destinationLocation}</Text>
            </View>
            <View style={styles.textIconGroup}>
              <Ionicons name="star" size={14} color="#FFD336" />
              <Text style={styles.rating}>
                {trip.reviews.length > 0 ? (
                  <>
                    {trip.reviews.reduce(
                      (sum: any, review: any) => sum + review.rating,
                      0
                    ) / trip.reviews.length}{" "}
                    ({trip.reviews.length})
                  </>
                ) : (
                  "Sem avaliações"
                )}
              </Text>
            </View>
            <View style={styles.textIconGroup}>
              <Text
                style={[styles.price, { color: "green", fontWeight: "bold" }]}
              >
                R$
              </Text>
              <Text style={styles.price}>{formattedTotalCost}</Text>
            </View>
          </View>

          <FlatList
            horizontal
            data={trip.images.slice(0, imagesToShow)}
            renderItem={({ item }) => (
              <Image style={styles.albumImageCard} source={{ uri: item }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              trip.images.length > imagesToShow ? (
                <View style={styles.moreImages}>
                  <Text style={styles.moreImagesText}>
                    +{trip.images.length - imagesToShow}
                  </Text>
                </View>
              ) : null
            }
          />

          <Text style={styles.infoTitle}>Informações da Viagem</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="airplane-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Partida:{" "}
                <Text style={styles.infoTextBold}>
                  {trip.departureLocation}
                </Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Destino:{" "}
                <Text style={styles.infoTextBold}>
                  {trip.destinationLocation}
                </Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Data de Partida:{" "}
                <Text style={styles.infoTextBold}>
                  {new Date(trip.departureDate).toLocaleDateString()}
                </Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Data de Retorno:{" "}
                <Text style={styles.infoTextBold}>
                  {new Date(trip.returnDate).toLocaleDateString()}
                </Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="bed-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Duração da Acomodação:{" "}
                <Text style={styles.infoTextBold}>
                  {trip.accommodationDuration} dias
                </Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Custo do Voo:{" "}
                <Text style={styles.infoTextBold}>R${trip.flightCost}</Text>
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="restaurant-outline" size={20} color="#333" />
              <Text style={styles.infoText}>
                Custo das Refeições:{" "}
                <Text style={styles.infoTextBold}>R${trip.mealCost}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.infoTitle}>Itinerário</Text>
          {trip.itineraries.map((itinerary: any, index: number) => (
            <View key={index} style={styles.itineraryItem}>
              <Text style={styles.itineraryDate}>
                {new Date(itinerary.date).toLocaleDateString()}
              </Text>
              <Text style={styles.itineraryActivity}>{itinerary.activity}</Text>
              <Text style={styles.itineraryDescription}>
                {itinerary.description}
              </Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Restaurantes</Text>
          {trip.restaurants.map((restaurant: any, index: number) => (
            <View key={index} style={styles.restaurantItem}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantBudget}>{restaurant.budget}</Text>
              <Text style={styles.restaurantUrl}>{restaurant.url}</Text>
            </View>
          ))}

          <Text style={styles.infoTitle}>Dicas Extras</Text>
          {trip.dicasExtras.map((dica: string, index: number) => (
            <Text key={index} style={styles.infoText}>
              {dica}
            </Text>
          ))}

          <Text style={styles.infoTitle}>Observações</Text>
          {trip.observacoes.map((observacao: string, index: number) => (
            <Text key={index} style={styles.infoText}>
              {observacao}
            </Text>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          /* ação do botão */
        }}
      >
        <Ionicons name="share-social" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: width,
    height: height / 2.5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card: {
    position: "absolute",
    top: height / 2.5 - 30,
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textIconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    gap: 10,
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
  rating: {
    fontSize: 14,
    color: "#FFD336",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
    paddingHorizontal: 10,
  },
  infoSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  infoTextBold: {
    fontWeight: "bold",
    color: "#333",
  },
  albumContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  albumImageCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  moreImages: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#000000af",
    justifyContent: "center",
    alignItems: "center",
  },
  moreImagesText: {
    color: "#fff",
    fontSize: 14,
  },
  itineraryItem: {
    marginBottom: 10,
  },
  itineraryDate: {
    fontSize: 14,
    color: "#888",
  },
  itineraryActivity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itineraryDescription: {
    fontSize: 14,
    color: "#666",
  },
  restaurantItem: {
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  restaurantBudget: {
    fontSize: 14,
    color: "#888",
  },
  restaurantUrl: {
    fontSize: 14,
    color: "#1e90ff",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF7029",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
