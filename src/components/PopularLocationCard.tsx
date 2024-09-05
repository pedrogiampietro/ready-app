import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PopularLocation } from "../views/HomePage";

const defaultImage = require("../../assets/no-img.jpg");

const PopularLocationCard: React.FC<PopularLocation> = ({
  location,
  totalCost,
  from,
  count,
  banner_bucket,
  rating,
}) => {
  const imageSource = banner_bucket ? { uri: banner_bucket } : defaultImage;

  return (
    <View style={styles.card}>
      <ImageBackground
        source={imageSource}
        style={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.cardInfo}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.price}>{count} trips</Text>
          <Text style={styles.price}>R$ {totalCost}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {rating && rating > 0 ? rating : 0}
            </Text>
            <Ionicons name="star" size={16} color="#FF7029" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 15,
  },
  cardImage: {
    width: "100%",
    height: 120,
    justifyContent: "flex-end",
  },
  cardInfo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    justifyContent: "flex-end",
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#fff",
    marginRight: 5,
  },
});

export default PopularLocationCard;
