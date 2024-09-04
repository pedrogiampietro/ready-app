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

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation() as any;
  const [email, setEmail] = useState("");

  const handleBack = () => {
    navigation.navigate("LoginPage");
  };

  const handleSendLink = async () => {
    try {
      const api = await apiClient();
      await api.post("/users/forgot-password", { email });
      Alert.alert(
        "Verifique seu e-mail",
        "Enviamos um link com um código para redefinir sua senha."
      );
      navigation.navigate("EnterCodeScreen", { email });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o link. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Esqueceu a Senha?</Text>
      <Text style={styles.subtitle}>
        Digite seu e-mail para receber um link de redefinição de senha.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#f1f1f1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
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
    borderColor: "#333",
    borderWidth: 1,
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
