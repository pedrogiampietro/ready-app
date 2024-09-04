import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { apiClient } from "../../services/api";
import styles from "./styles";
import { HotelCard } from "../../components/HotelCard";
import { formatDate } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const GeneralScreen = ({ trip, updateTripData }: any) => {
  const [showFullText, setShowFullText] = useState(false);
  const [dailySavings, setDailySavings] = useState<any>([]);
  const [savingsInput, setSavingsInput] = useState<any>("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("departure");
  const [flightDepartureDate, setFlightDepartureDate] = useState<any>(
    trip.flightDepartureDate ? new Date(trip.flightDepartureDate) : new Date()
  );
  const [flightReturnDate, setFlightReturnDate] = useState<any>(
    trip.flightReturnDate ? new Date(trip.flightReturnDate) : new Date()
  );
  const [images, setImages] = useState<any[]>(trip.images || []);
  const [banner, setBanner] = useState<any>(trip.banner || "");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [editedTrip, setEditedTrip] = useState({
    title: trip.title,
    departureLocation: trip.departureLocation,
    destinationLocation: trip.destinationLocation,
    accommodationName: trip.hotelName,
    accommodationDuration: trip.accommodationDuration?.toString(),
    accommodationPrice: trip.hotelPrice?.toString(),
    flightDepartureDate: trip.flightDepartureDate,
    flightReturnDate: trip.flightReturnDate,
    flightCost: trip.flightCost?.toString(),
    budgetTravel: trip.budgetTravel ? trip.budgetTravel?.toString() : "",
    departureDate: trip.departureDate,
    returnDate: trip.returnDate,
    userId: trip.userId,
  });

  const navigation = useNavigation() as any;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData() as any;

    formData.append("title", editedTrip.title);
    formData.append("departureLocation", editedTrip.departureLocation);
    formData.append("destinationLocation", editedTrip.destinationLocation);
    formData.append("accommodationName", editedTrip.accommodationName);
    formData.append("accommodationDuration", editedTrip.accommodationDuration);
    formData.append("accommodationPrice", editedTrip.accommodationPrice);
    formData.append("flightDepartureDate", flightDepartureDate.toISOString());
    formData.append("flightReturnDate", flightReturnDate.toISOString());
    formData.append("flightCost", editedTrip.flightCost);
    formData.append("budgetTravel", editedTrip.budgetTravel);
    formData.append("departureDate", editedTrip.departureDate);
    formData.append("returnDate", editedTrip.returnDate);
    formData.append("userId", editedTrip.userId);

    if (banner) {
      formData.append("banner", {
        uri: banner,
        type: "image/jpeg",
        name: `banner_${Date.now()}.jpg`,
      });
    }

    images
      .filter((img) => img !== undefined)
      .forEach((image, index) => {
        formData.append("images", {
          uri: image,
          type: "image/jpeg",
          name: `image_${index}_${Date.now()}.jpg`,
        });
      });

    try {
      const api = await apiClient();
      const response = await api.put(`/trips/${trip.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Viagem atualizada com sucesso!");
        updateTripData({
          ...editedTrip,
          flightDepartureDate: flightDepartureDate.toISOString(),
          flightReturnDate: flightReturnDate.toISOString(),
          images: images.filter((img) => img !== undefined),
          banner,
        });
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error("Error updating trip:", error);
      if (error.response && error.response.status === 413) {
        Alert.alert(
          "Erro",
          "O arquivo enviado é muito grande. Por favor, selecione um arquivo menor."
        );
      } else {
        Alert.alert("Erro", "Não foi possível atualizar a viagem.");
      }
    } finally {
      setLoading(false);
    }
  };

  const addImage = async () => {
    setLoadingImage(true);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled }: any =
        await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: false,
          aspect: [4, 4],
          quality: 1,
        });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else if (assets[0]?.uri && assets[0].fileSize > MAX_FILE_SIZE) {
        Alert.alert(
          "Erro",
          "A imagem selecionada é muito grande. Por favor, selecione uma imagem menor."
        );
      } else {
        setImages([...images, assets[0]?.uri]);
      }
    }
    setLoadingImage(false);
  };

  const changeHeaderImage = async () => {
    setLoadingImage(true);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled }: any =
        await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: false,
          aspect: [4, 4],
          quality: 1,
        });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else if (assets[0]?.uri && assets[0].fileSize > MAX_FILE_SIZE) {
        Alert.alert(
          "Erro",
          "A imagem selecionada é muito grande. Por favor, selecione uma imagem menor."
        );
      } else {
        setBanner(assets[0]?.uri);
      }
    }
    setLoadingImage(false);
  };

  const handleOpenDatePicker = (mode: string) => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (datePickerMode === "departure") {
        setFlightDepartureDate(selectedDate);
        setEditedTrip({
          ...editedTrip,
          flightDepartureDate: selectedDate.toISOString(),
        });
      } else {
        setFlightReturnDate(selectedDate);
        setEditedTrip({
          ...editedTrip,
          flightReturnDate: selectedDate.toISOString(),
        });
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    setImages(updatedImages);
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja excluir esta viagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              setLoading(true);
              const api = await apiClient();
              await api.delete(`/trips/${trip.id}`);
              navigation.navigate("HomePage");
              Alert.alert("Sucesso", "Viagem excluída com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir viagem:", error);
              Alert.alert("Erro", "Não foi possível excluir a viagem.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const startDate = new Date(trip.departureDate);
  const endDate = new Date(trip.returnDate);
  const initialNumberOfDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const travelExpenses = [
    { id: 1, description: "Passagens aéreas", amount: trip.flightCost },
    {
      id: 2,
      description: "Hospedagem",
      amount: trip.hotelPrice * trip.accommodationDuration,
    },
    { id: 3, description: "Alimentação", amount: trip.mealCost },
  ];

  const totalSavings = dailySavings.reduce(
    (total: any, saving: any) => total + saving.amount,
    0
  );

  const remainingAmount = trip.totalCost - totalSavings;
  const dailyBudget = remainingAmount / initialNumberOfDays;

  const addDailySaving = () => {
    if (savingsInput !== "") {
      const newSaving = {
        amount: parseFloat(savingsInput),
        date: new Date().toLocaleDateString("pt-BR"),
      };
      setDailySavings([...dailySavings, newSaving]);
      setSavingsInput("");
    }
  };

  const removeDailySaving = (index: any) => {
    const updatedSavings = dailySavings.filter((_: any, i: any) => i !== index);
    setDailySavings(updatedSavings);
  };

  const calculateDaysToReachGoal = () => {
    return Math.ceil(remainingAmount / dailyBudget);
  };

  const daysToReachGoal = calculateDaysToReachGoal();

  return (
    <ScrollView>
      <ImageBackground
        source={{ uri: trip.banner || "https://via.placeholder.com/100" }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={{ alignItems: "center" }}>
          {isEditing ? (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: "#fff" }]}>
                Título da Viagem:
              </Text>
              <TextInput
                style={[styles.input, { color: "#fff" }]}
                value={editedTrip.title}
                onChangeText={(text) =>
                  setEditedTrip({ ...editedTrip, title: text })
                }
              />
            </View>
          ) : (
            <Text style={styles.headerTitle}>{trip.title}</Text>
          )}
          <ScrollView
            style={styles.scrollViewStyle}
            showsVerticalScrollIndicator
          >
            <Text style={styles.infoText}>
              {showFullText
                ? trip.observacoes.join(" ")
                : `${trip.observacoes.join(" ").substring(0, 100)}`}
              {!showFullText && trip.observacoes.length > 100 && (
                <Text
                  style={{ color: "#FF7029" }}
                  onPress={() => setShowFullText(true)}
                >
                  {" "}
                  Ler mais...
                </Text>
              )}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Local de Partida:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.departureLocation}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, departureLocation: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destino:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.destinationLocation}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, destinationLocation: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Acomodação:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.accommodationName}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, accommodationName: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Duração da Acomodação:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.accommodationDuration}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, accommodationDuration: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preço da Acomodação:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.accommodationPrice}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, accommodationPrice: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Custo do Voo:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.flightCost}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, flightCost: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Orçamento da viagem:</Text>
            <TextInput
              style={styles.input}
              value={editedTrip.budgetTravel}
              onChangeText={(text) =>
                setEditedTrip({ ...editedTrip, budgetTravel: text })
              }
            />
          </View>
          <Fragment>
            <TouchableOpacity
              style={styles.inputTouchable}
              onPress={() => handleOpenDatePicker("departure")}
            >
              <Text style={styles.inputLabel}>Data de partida do voo:</Text>
              <Text style={styles.inputText}>
                {flightDepartureDate && !isNaN(flightDepartureDate)
                  ? format(flightDepartureDate, "dd/MM/yyyy")
                  : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputTouchable}
              onPress={() => handleOpenDatePicker("return")}
            >
              <Text style={styles.inputLabel}>Data de retorno do voo:</Text>
              <Text style={styles.inputText}>
                {flightReturnDate && !isNaN(flightReturnDate)
                  ? format(flightReturnDate, "dd/MM/yyyy")
                  : ""}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={
                  datePickerMode === "departure"
                    ? flightDepartureDate
                    : flightReturnDate
                }
                mode="date"
                display="inline"
                locale="pt-BR"
                timeZoneOffsetInMinutes={-180}
                onChange={handleDateChange}
              />
            )}
          </Fragment>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Banner:</Text>
            <TouchableOpacity
              onPress={changeHeaderImage}
              style={styles.bannerButton}
            >
              {loadingImage ? (
                <ActivityIndicator color="#FFF" />
              ) : banner ? (
                <Image source={{ uri: banner }} style={styles.bannerImage} />
              ) : (
                <Text>Adicionar Banner</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Imagens:</Text>
            <ScrollView horizontal style={styles.imageSlider}>
              {images.map((image: any, index: number) => (
                <View key={index}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="trash-outline" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={addImage}>
                {loadingImage ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Ionicons name="add" size={24} color="#fff" />
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: "#333" }]}
              onPress={() => setIsEditing(false)}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>
                <Ionicons name="pencil-outline" size={24} color="#FFF" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleDeleteTrip}
            >
              <Text style={styles.editButtonText}>
                <Ionicons name="trash-bin-outline" size={24} color="#FFF" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>
                <Ionicons name="eye-off-outline" size={24} color="#FFF" />
              </Text>
            </TouchableOpacity>
          </View>

          <HotelCard
            hotelName={trip.hotelName}
            address={trip.destinationLocation}
            checkInDate={formatDate(trip.departureDate)}
            checkOutDate={formatDate(trip.returnDate)}
            budget={Number(trip.budgetTravel)}
            duration={trip.accommodationDuration.toString()}
          />
          <View style={styles.expenseCard}>
            <Text style={[styles.infoTitle, { marginTop: 0 }]}>
              Gastos da Viagem
            </Text>
            {travelExpenses.map((expense, index: number) => (
              <Text key={index}>
                {`${expense.description}: R$ ${
                  expense.amount != null
                    ? Number(expense.amount).toFixed(2)
                    : "0.00"
                }`}
              </Text>
            ))}
            <Text style={{ fontWeight: "bold" }}>
              Total: R${" "}
              {trip.totalCost != null
                ? Number(trip.totalCost).toFixed(2)
                : "0.00"}
            </Text>
            <Text>Dias até a viagem: {initialNumberOfDays}</Text>
            <Text>Valor diário a economizar: R$ {dailyBudget?.toFixed(2)}</Text>
            <Text>Dias necessários para atingir a meta: {daysToReachGoal}</Text>
          </View>
          <View style={styles.expenseInputContainer}>
            <TextInput
              style={styles.expenseInput}
              placeholder="Adicionar economia diária"
              keyboardType="numeric"
              value={savingsInput}
              onChangeText={setSavingsInput}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addDailySaving}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.addButtonText}>Adicionar</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.expenseCard}>
            <Text style={[styles.infoTitle, { marginTop: 0 }]}>
              Economias Diárias
            </Text>
            {dailySavings.map((saving: any, index: any) => (
              <View key={index} style={styles.savingItem}>
                <Text>
                  Data: {saving.date} - Economia: R${" "}
                  {saving.amount != null
                    ? Number(saving.amount).toFixed(2)
                    : "0.00"}
                </Text>
                <TouchableOpacity onPress={() => removeDailySaving(index)}>
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Text style={{ fontWeight: "bold" }}>
              Total das economias diárias: R$ {totalSavings.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default GeneralScreen;
