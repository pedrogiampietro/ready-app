import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type HotelProps = {
  hotelName: string;
  address: string;
  checkInDate: string;
  checkOutDate: string;
  budget: number;
  duration: string;
};

export const HotelCard = ({
  hotelName,
  address,
  checkInDate,
  checkOutDate,
  budget,
  duration,
}: HotelProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.hotelName}>{hotelName}</Text>
      <View style={styles.locationRow}>
        <MaterialIcons name="location-on" size={20} color="#333" />
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.checkInOutRow}>
        <View style={styles.checkInBox}>
          <Text style={styles.checkTitle}>Check-in</Text>
          <Text style={styles.checkTime}>{checkInDate}</Text>
        </View>
        <View style={styles.checkOutBox}>
          <Text style={styles.checkTitle}>Check-out</Text>
          <Text style={styles.checkTime}>{checkOutDate}</Text>
        </View>
      </View>
      <View style={styles.checkInOutRow}>
        <View>
          <Text style={styles.askTime}>Orçamento</Text>
          <Text style={styles.answerTime}>R$ {budget.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={styles.askTime}>Duração</Text>
          <Text style={styles.answerTime}>{duration} noites</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  address: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkInOutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkInBox: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
  },
  checkOutBox: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
  },
  checkTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  checkTime: {
    fontSize: 14,
  },
  askTime: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  answerTime: {
    fontSize: 14,
    marginBottom: 8,
    alignSelf: "center",
  },
});

// Exemplo de uso:
// <HotelCard
//   hotelName="Central Park Hotel"
//   address="123 Main St, New York, NY"
//   checkInDate="Jul 5, 8:00 PM EDT"
//   checkOutDate="Jul 9, 9:00 AM EDT"
//   quantityBads="ABC123"
//   duration="4"
// />
