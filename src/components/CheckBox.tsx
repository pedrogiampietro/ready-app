import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckBoxProps {
  title: string;
  checked: boolean;
  onPress: () => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  title,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
      onPress={onPress}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
      >
        {checked ? <Ionicons name="checkmark" size={12} color="#000" /> : null}
      </View>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
