import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

type ButtonProps = {
  text: string;
  redirectTo: string;
};

export function PressableButton({ text, redirectTo }: ButtonProps) {
  const navigation = useNavigation() as any;

  const handleButton = () => {
    navigation.navigate(redirectTo);
  };

  return (
    <Pressable style={styles.button} onPress={handleButton}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24BAEC",
    borderRadius: 16,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
