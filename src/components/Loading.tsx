import { ActivityIndicator, View, StyleSheet } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#FF7029" size={24} />
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
