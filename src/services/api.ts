import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { navigate } from "./NavigationService";

const limit = 20;
let user = null as any;

export let baseURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.startsWith("https")
    ? `${process.env.REACT_APP_API_URL}`
    : process.env.REACT_APP_API_URL
  : // : "http://192.168.1.7:3333";
    "https://ready-api.vercel.app";

export async function signOut() {
  await AsyncStorage.removeItem("user@readyApp");

  ToastAndroid.show(
    "Ahhh, você já está indo? Isso será um até logo! 😁",
    ToastAndroid.SHORT
  );

  navigate("LoginPage");
}

/**
 * Creates an instance of axios with predefined configuration.
 */
export async function apiClient() {
  const storedUser = await AsyncStorage.getItem("user@readyApp");

  if (storedUser) {
    const userData = JSON.parse(storedUser);
    user = userData;
  }

  // console.log("user", user);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  // Request interceptor to add limit header for GET requests
  api.interceptors.request.use(
    (request) => {
      if (request.method?.toLowerCase() === "get") {
        request.headers.limit = request.headers.limit ?? String(limit);
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle errors and token expiration
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log("Error ->", error.response.data);

      if (error.response) {
        if (error.response.data?.name === "TokenExpiredError") {
          signOut();
        } else {
          const errorMessage =
            error.response.data?.error || "Erro desconhecido";
          ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
          console.error("Server response error:", error.response);
        }
      } else if (error.request) {
        ToastAndroid.show(
          "Nenhuma resposta recebida do servidor.",
          ToastAndroid.SHORT
        );
        console.error("No response received:", error.request);
        signOut();
      } else {
        ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
        console.error("Request configuration error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
}
