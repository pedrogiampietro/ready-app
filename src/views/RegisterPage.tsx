import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ready-api.vercel.app/users/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        ToastAndroid.show("Usuário criado com sucesso!", ToastAndroid.SHORT);
        navigation.navigate("LoginPage");
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Register error:", error);
      ToastAndroid.show(
        "Erro ao tentar registrar. Por favor, tente novamente.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogin}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastre-se agora!</Text>
        <Text style={styles.subtitle}>
          Informe alguns detalhes para criar sua conta
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome: Pedro Giampietro"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite seu melhor e-mail: pedro@dev.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordInput}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="********"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={styles.showPasswordButton}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Registrar</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Você já tem uma conta?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signupLink}>Logar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  registerButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#FF7029",
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  signupText: {
    marginRight: 5,
  },
  signupLink: {
    color: "#FF7029",
  },
});
