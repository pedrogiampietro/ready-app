import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const UpgradePlanModal = ({ visible, onClose, onUpgrade }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Upgrade de Plano Necessário</Text>
          <Text style={styles.modalText}>
            Você atingiu o limite de criação de viagens no plano gratuito. Faça
            o upgrade para o plano Pro para continuar criando viagens com IA.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onUpgrade}>
            <Text style={styles.buttonText}>Fazer Upgrade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF7029",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: "#FF7029",
  },
});
