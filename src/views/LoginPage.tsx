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
import { useAuth } from "../hooks/useAuth";
import { apiClient } from "../services/api";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;
  const { login } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBack = () => {
    navigation.navigate("OnboardPeoplePage");
  };

  const handleRegister = () => {
    navigation.navigate("RegisterPage");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient().post("/users/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.success) {
        ToastAndroid.show("Login bem sucedido", ToastAndroid.SHORT);
        login(response.data.data);
        navigation.navigate("HomeTabs");
      } else {
        ToastAndroid.show(
          response.data.message || "Ahhh! falha",
          ToastAndroid.SHORT
        );
        console.log({
          success: false,
          message: response.data.message,
          data: null,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      ToastAndroid.show(
        "Erro ao tentar logar. Por favor, tente novamente.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Faça login agora</Text>
        <Text style={styles.subtitle}>
          Por favor, faça login para continuar para o app
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordInput}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="Senha"
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
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Perdeu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Você ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signupLink}>Crie aqui</Text>
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
  forgotPasswordButton: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#FF7029",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
