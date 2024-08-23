import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

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
    navigation.navigate("OnboardWidePage");
  };

  const handleRegister = () => {
    navigation.navigate("RegisterPage");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        // "https://ready-api.vercel.app/users/login",
        "http://192.168.1.7:3333/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data.success) {
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data?.token}`;

        ToastAndroid.show("Login bem sucedido", ToastAndroid.SHORT);
        login(response.data.data, response.data.token);
        navigation.navigate("HomeTabs");
      } else {
        ToastAndroid.show(
          response.data.message || "Ahhh! falha",
          ToastAndroid.SHORT
        );
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
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.centeredContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/logo3.png")}
        />
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
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
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
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
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
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FF7029",
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
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
    fontSize: 16,
  },
  signupLink: {
    color: "#FF7029",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default LoginPage;
