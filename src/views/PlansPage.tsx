import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as IAP from "react-native-iap";

const productIds = ["pro-plan-id"] as any;

export const PlansPage = () => {
  const navigation = useNavigation();
  const [availableItems, setAvailableItems] = useState<any>([]);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const initIAP = async () => {
      try {
        const connection = await IAP.initConnection();
        if (connection) {
          const items = await IAP.getProducts(productIds);
          setAvailableItems(items);
        } else {
          console.warn("IAP não está disponível");
        }
      } catch (err) {
        console.warn("Erro na conexão IAP:", err);
      }
    };

    initIAP();

    return () => {
      IAP.endConnection();
    };
  }, []);

  const handlePurchase = async (productId: any) => {
    try {
      const purchase = await IAP.requestPurchase(productId);
      if (purchase) {
        // lógica para salvar a compra
        setPurchased(true);
        Alert.alert("Compra bem-sucedida", "Você agora é um usuário Pro!");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Escolha seu Plano</Text>
      </View>
      <View style={styles.planContainer}>
        <Ionicons
          name="star-outline"
          size={24}
          color="#FF7029"
          style={styles.planIcon}
        />
        <Text style={styles.planTitle}>Plano Free</Text>
        <Text style={styles.planDescription}>
          - Acesso limitado{"\n"}- 1 viagem gratuita com AI{"\n"}- 3
          aprimoramentos de texto com AI
        </Text>
      </View>
      <View style={[styles.planContainer, styles.proPlan]}>
        <Ionicons name="star" size={24} color="#fff" style={styles.planIcon} />
        <Text style={styles.planTitle}>Plano Pro</Text>
        <Text style={styles.planDescription}>
          - Acesso completo{"\n"}- Viagens ilimitadas com AI{"\n"}- Textos
          aprimorados ilimitados{"\n"}- Suporte prioritário
        </Text>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={() => handlePurchase("pro_plan_product_id")}
        >
          <Text style={styles.purchaseButtonText}>Comprar Plano Pro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#FF7029",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 20,
  },
  planContainer: {
    padding: 25,
    backgroundColor: "#333",
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  planIcon: {
    marginBottom: 10,
  },
  proPlan: {
    backgroundColor: "#FF7029",
    shadowColor: "#FF7029",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  planTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
  },
  planDescription: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  purchaseButtonText: {
    color: "#FF7029",
    fontSize: 18,
    fontWeight: "bold",
  },
});
