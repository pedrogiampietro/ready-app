import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HotelCard } from "../components/HotelCard";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const travelExpenses = [
  { description: "Passagens aéreas", amount: 1000 },
  { description: "Hospedagem", amount: 800 },
  { description: "Alimentação", amount: 500 },
];

const GeneralScreen = () => {
  const [showFullText, setShowFullText] = useState(false);

  const totalExpenses = travelExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const startDate = new Date("2024-05-21");
  const endDate = new Date("2024-06-21");
  const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const dailyBudget = totalExpenses / numberOfDays;

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.infoTitle}>Informações da Viagem</Text>
        <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator>
          <Text style={styles.infoText}>
            {showFullText
              ? "A viagem foi simplesmente incrível! Tudo o que planejamos foi realizado com sucesso e ainda superou nossas expectativas. Desde o momento em que embarcamos até o nosso retorno, cada momento foi repleto de alegria e emoção. As paisagens que vimos eram de tirar o fôlego, as pessoas que conhecemos ao longo do caminho eram amigáveis e acolhedoras, e a comida... ah, a comida era de outro mundo! Cada refeição era uma nova aventura culinária que nos deixava ansiosos pela próxima. E a melhor parte? Conseguimos fazer tudo isso e ainda economizar! Graças ao nosso planejamento cuidadoso e à nossa disposição para buscar as melhores ofertas, conseguimos aproveitar ao máximo nossa viagem sem estourar o orçamento. Na verdade, até sobrou dinheiro! No final, esta viagem não foi apenas uma chance de ver novos lugares e experimentar novas coisas. Foi uma jornada de autodescoberta e crescimento pessoal que nos deixou com lembranças que vamos valorizar para sempre. Mal podemos esperar pela próxima!"
              : "A viagem foi simplesmente incrível! Tudo o que planejamos foi realizado com sucesso e ainda superou nossas expectativas..."}
            {!showFullText && (
              <Text
                style={{ color: "#FF7029" }}
                onPress={() => setShowFullText(true)}
              >
                {" "}
                Ler mais...
              </Text>
            )}
          </Text>
        </ScrollView>
      </View>
      <HotelCard
        hotelName="Central Park Hotel"
        address="123 Main St, New York, NY"
        checkInDate="21/05/24, 8:00 PM"
        checkOutDate="31/05/24, 9:00 AM"
        quantityBads="2"
        duration="4"
      />

      <View style={styles.expenseCard}>
        <Text style={[styles.infoTitle, { marginTop: 0 }]}>
          Gastos da Viagem
        </Text>
        {travelExpenses.map((expense, index) => (
          <Text key={index}>
            {expense.description}: R$ {expense.amount.toFixed(2)}
          </Text>
        ))}
        <Text style={{ fontWeight: "bold" }}>
          Total: R$ {totalExpenses.toFixed(2)}
        </Text>
        <Text>Dias até a viagem: {numberOfDays}</Text>
        <Text>Valor diário a economizar: R$ {dailyBudget.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const RestaurantsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Restaurantes</Text>
  </View>
);

export const ViewTravelPage = () => {
  const navigation = useNavigation() as any;

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
        <Text style={styles.headerTitle}>Viagem XyZ</Text>
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
          <Screen name="Geral" component={GeneralScreen} />
          <Screen name="Restaurantes" component={RestaurantsScreen} />
        </Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabContainer: {
    marginTop: 80,
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  scrollViewStyle: {
    maxHeight: 200,
    overflow: "scroll",
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    padding: 20,
  },
  expenseCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
