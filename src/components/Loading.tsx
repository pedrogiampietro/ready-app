import { ActivityIndicator, View, StyleSheet } from "react-native";

export function Loading({ color }: any) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={24} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
