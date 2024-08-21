import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { apiClient } from "../services/api";
import { formatDate } from "../utils";
import { useAuth } from "../hooks/useAuth";
import { ImageWithSkeleton } from "../components/ImageWithSkeleton";

export const CalendarPage = () => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTrips = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/trips/trips-by-user/${user?.id}`);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchTrips();
    }
  }, [isFocused]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleTravelView = (trip: any) => {
    navigation.navigate("ViewTravelPage", { trip });
  };

  const getDaysInMonth = (month: any, year: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const monthName = monthNames[currentMonth];

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity />
        <Text style={styles.headerTitle}>Calendário</Text>
        <Ionicons name="notifications-outline" size={24} color="#FF7029" />
      </View>
      <View>
        <View style={styles.monthRow}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Ionicons name="arrow-back" size={24} color="#FF7029" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthName} {currentYear}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="arrow-forward" size={24} color="#FF7029" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {Array.from(
            { length: Math.ceil(daysInMonth / 7) },
            (_, i) => i + 1
          ).map((week) => (
            <View key={week} style={styles.weekRow}>
              {Array.from({ length: 7 }, (_, j) => j + 1).map((day) => {
                const date = (week - 1) * 7 + day;
                if (date > daysInMonth) return null;
                const dateString = `${currentYear}-${String(
                  currentMonth + 1
                ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                return (
                  <View key={date} style={styles.dayCard}>
                    <Text>{date}</Text>
                    {trips.some(
                      (trip: any) =>
                        new Date(trip.departureDate)
                          .toISOString()
                          .split("T")[0] === dateString
                    ) && <Ionicons name="airplane" size={24} color="#FF7029" />}
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.tripTitle}>Minhas viagens</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF7029" />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleTravelView(item)}>
              <View
                style={[
                  styles.card,
                  index === trips.length - 1 && styles.lastCard,
                ]}
              >
                <ImageWithSkeleton
                  uri={item.banner ? item.banner : item.banner_bucket}
                  width={100}
                  height={100}
                  borderRadius={10}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardRow}>
                    <Ionicons name="calendar" size={16} color="#FF7029" />
                    <Text>{formatDate(item.departureDate)}</Text>
                  </View>
                  <Text
                    style={[styles.tripTitle, { marginTop: 0, marginLeft: 0 }]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.cardRow}>
                    <Ionicons name="location" size={16} color="#FF7029" />
                    <Text style={{ color: "#7D848D" }}>
                      {item.destinationLocation}
                    </Text>
                  </View>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#FF7029" />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
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
  tripTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 50,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  weekRow: {
    flexDirection: "row",
  },
  dayCard: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  lastCard: {
    marginBottom: 90,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default CalendarPage;
