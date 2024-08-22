import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { apiClient } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export const EnterCodeScreen = ({ route }: any) => {
  const [code, setCode] = useState("");
  const { email } = route.params;
  const navigation = useNavigation() as any;

  const handleBack = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleVerifyCode = async () => {
    try {
      // Verificar código via API
      const api = await apiClient();
      await api.post("/users/verify-code", { email, code });
      navigation.navigate("NewPasswordScreen", { email, code });
    } catch (error) {
      Alert.alert("Erro", "Código inválido. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Verifique seu Código</Text>
      <Text style={styles.subtitle}>
        Digite o código enviado para seu e-mail.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7029",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#b3b3b3",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
