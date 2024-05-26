import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";

interface TravelPlanModalProps {
  visible: boolean;
  travelPlan: string;
  onClose: () => void;
}

export const TravelPlanModal: React.FC<TravelPlanModalProps> = ({
  visible,
  travelPlan,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sua Viagem</Text>
          <ScrollView style={styles.modalScroll}>
            <Markdown style={styles.markdownStyle as any}>
              {travelPlan}
            </Markdown>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalScroll: {
    maxHeight: "70%",
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF7029",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  markdownStyle: {
    body: {
      fontSize: 16,
      color: "#333",
    },
    heading1: {
      fontSize: 22,
      color: "#FF7029",
      marginBottom: 10,
    },
    heading2: {
      fontSize: 20,
      color: "#FF7029",
      marginBottom: 10,
    },
    heading3: {
      fontSize: 18,
      color: "#FF7029",
      marginBottom: 10,
    },
    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      marginVertical: 10,
    },
    link: {
      color: "#FF7029",
      textDecorationLine: "underline",
    },
  } as any,
});
