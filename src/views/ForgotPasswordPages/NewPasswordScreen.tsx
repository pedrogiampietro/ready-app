import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiClient } from "../../services/api";

export const NewPasswordScreen = ({ route }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const { email, code } = route.params;
  const navigation = useNavigation() as any;

  const handleResetPassword = async () => {
    try {
      // Enviar nova senha via API
      const api = await apiClient();
      await api.post("/users/reset-password", {
        email,
        code,
        newPassword,
      });
      Alert.alert(
        "Sucesso",
        "Sua senha foi redefinida. Agora você pode fazer login."
      );
      navigation.navigate("LoginPage");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível redefinir a senha. Tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Senha</Text>
      <Text style={styles.subtitle}>Defina uma nova senha para sua conta.</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
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
