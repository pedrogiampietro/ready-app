import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Markdown from "react-native-markdown-display";

interface TravelPlanModalProps {
  visible: boolean;
  travelPlan: object;
  onClose: () => void;
  onSave: () => void;
}

export const TravelPlanModal: React.FC<TravelPlanModalProps> = ({
  visible,
  travelPlan,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave();
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTravelPlan = (plan: any) => {
    let formattedPlan = `# Plano de Viagem\n\n`;

    if (plan.voo) {
      formattedPlan += `## Voo\n`;
      formattedPlan += `**Companhia:** ${plan.voo.companhia}\n`;
      formattedPlan += `**Preço:** ${plan.voo.preco}\n`;
      formattedPlan += `**Data de Ida:** ${plan.voo.data.ida}\n`;
      formattedPlan += `**Data de Volta:** ${plan.voo.data.volta}\n`;
      formattedPlan += `**URL:** [${plan.voo.url}](${plan.voo.url})\n\n`;
    }

    if (plan.hospedagem) {
      formattedPlan += `## Hospedagem\n`;
      formattedPlan += `**Hotel:** ${plan.hospedagem.hotel}\n`;
      formattedPlan += `**Preço:** ${plan.hospedagem.preco}\n`;
      formattedPlan += `**URL:** [${plan.hospedagem.url}](${plan.hospedagem.url})\n\n`;
    }

    if (plan.restaurantes) {
      formattedPlan += `## Restaurantes\n`;
      plan.restaurantes.forEach((categoria: any) => {
        formattedPlan += `### ${categoria.categoria}\n`;
        categoria.locais.forEach((local: any) => {
          formattedPlan += `- **Nome:** ${local.nome}\n`;
          formattedPlan += `- **Preço:** ${local.preco}\n`;
          formattedPlan += `- **URL:** [${local.url}](${local.url})\n\n`;
        });
      });
    }

    if (plan.roteiro) {
      formattedPlan += `## Roteiro\n`;
      plan.roteiro.forEach((dia: any) => {
        formattedPlan += `### Dia ${dia.dia}\n`;
        dia.atividades.forEach((atividade: any) => {
          formattedPlan += `- ${atividade}\n`;
        });
        formattedPlan += `\n`;
      });
    }

    if (plan.observacoes) {
      formattedPlan += `## Observações\n`;
      plan.observacoes.forEach((observacao: any) => {
        formattedPlan += `- ${observacao}\n`;
      });
      formattedPlan += `\n`;
    }

    if (plan.dicas_extras) {
      formattedPlan += `## Dicas Extras\n`;
      plan.dicas_extras.forEach((dica: any) => {
        formattedPlan += `- ${dica}\n`;
      });
      formattedPlan += `\n`;
    }

    return formattedPlan;
  };

  const formattedTravelPlan = formatTravelPlan(travelPlan);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sua Viagem</Text>
          <ScrollView style={styles.modalScroll}>
            <Markdown style={styles.markdownStyle as any}>
              {formattedTravelPlan}
            </Markdown>
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Descartar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Salvar nossa viagem</Text>
            )}
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
  button: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#FF7029",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
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
