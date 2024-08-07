import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface AvatarStackProps {
  avatars: string[];
}

export const AvatarStack = ({ avatars }: AvatarStackProps) => {
  return (
    <View style={styles.container}>
      {avatars.map((avatar, index) => (
        <Image
          key={index}
          source={{ uri: avatar }}
          style={[styles.avatar, { right: index * 20 }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 22,
    position: "absolute",
  },
});
