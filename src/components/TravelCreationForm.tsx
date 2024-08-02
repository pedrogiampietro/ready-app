import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import axios from "axios";
import { apiClient } from "../services/api";
import { Loading } from "./Loading";
import { CheckBox } from "./CheckBox";

const windowHeight = Dimensions.get("window").height;

interface LocationOption {
  name: string;
  country: string;
  population: number;
}

interface Meal {
  checked: boolean;
  value: string;
  visible: boolean;
}

interface Meals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export const TravelCreationForm = ({ updateCallbackTrips }: any) => {
  const [loading, setLoading] = useState(false);
  const [loadingEmbelizeTitle, setLoadingEbelizeTitle] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [headerImage, setHeaderImage] = useState<any>(
    "https://www.remessaonline.com.br/blog/wp-content/uploads/2022/05/viagem-para-cancun.jpg"
  );

  const [accommodation, setAccommodation] = useState("");
  const [accommodationDuration, setAccommodationDuration] = useState("");
  const [accommodationPrice, setAccommodationPrice] = useState("");

  const [flightDepartureDate, setFlightDepartureDate] = useState(new Date());
  const [flightReturnDate, setFlightReturnDate] = useState(new Date());
  const [flightCost, setFlightCost] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"departure" | "return">(
    "departure"
  );

  const [isFlying, setIsFlying] = useState(false);

  const [meals, setMeals] = useState<Meals>({
    breakfast: { checked: false, value: "", visible: false },
    lunch: { checked: false, value: "", visible: false },
    dinner: { checked: false, value: "", visible: false },
  });

  const [departureLocation, setDepartureLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [departureLocationOptions, setDepartureLocationOptions] = useState<
    LocationOption[]
  >([]);
  const [destinationLocationOptions, setDestinationLocationOptions] = useState<
    LocationOption[]
  >([]);
  const [showDepartureOptions, setShowDepartureOptions] = useState(false);
  const [showDestinationOptions, setShowDestinationOptions] = useState(false);
  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] =
    useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] =
    useState(false);

  const toggleMealOption = (meal: keyof Meals) => {
    setMeals({
      ...meals,
      [meal]: {
        ...meals[meal],
        checked: !meals[meal].checked,
        visible: !meals[meal].visible,
      },
    });
  };

  const updateMealValue = (meal: keyof Meals, value: string) => {
    setMeals({
      ...meals,
      [meal]: { ...meals[meal], value: value },
    });
  };

  const searchLocations = async (
    query: string,
    setOptions: any,
    setLoading: any
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=abhiaiyer`
      );
      // Limit the results to the first 3 items
      const limitedResults = response.data.geonames
        .slice(0, 3)
        .map((item: any) => ({
          name: item.name,
          country: item.countryName,
          population: item.population,
        }));
      setOptions(limitedResults);
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const addImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        setImages([...images, assets[0]?.uri]);
      }
    }
  };

  const changeHeaderImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        setHeaderImage(assets[0]?.uri);
      }
    }
  };

  const deleteImage = (indexToDelete: number) => {
    const updatedImages = images.filter(
      (_: any, index: number) => index !== indexToDelete
    );
    setImages(updatedImages);
  };

  const handleLocationSelect = (
    selectedLocation: string,
    setLocation: any,
    setShowOptions: any
  ) => {
    setLocation(selectedLocation);
    setShowOptions(false);
  };

  const handleOpenDatePicker = (mode: "departure" | "return") => {
    setShowDatePicker(true);
    setDatePickerMode(mode);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) {
      if (datePickerMode === "departure") {
        setFlightDepartureDate(selectedDate);
      } else {
        setFlightReturnDate(selectedDate);
      }
    }
  };

  const createTrip = async () => {
    setLoading(true);

    try {
      const formData = new FormData() as any;
      formData.append("title", title);
      formData.append("departureLocation", departureLocation);
      formData.append("destinationLocation", destinationLocation);
      formData.append("accommodation", accommodation);
      formData.append("accommodationDuration", accommodationDuration);
      formData.append("accommodationPrice", accommodationPrice);
      formData.append("flightDepartureDate", flightDepartureDate.toString());
      formData.append("flightReturnDate", flightReturnDate.toString());
      formData.append("flightCost", flightCost);
      formData.append("userId", "b8374eed-dca3-4e38-92d6-a70083531cea");

      // Adicionando o banner
      formData.append("banner", {
        uri: headerImage,
        type: "image/jpeg",
        name: "banner.jpg",
      });

      // Adicionando as imagens
      images.forEach((image, index) => {
        formData.append("images", {
          uri: image,
          type: "image/jpeg",
          name: `image_${index}.jpg`,
        });
      });

      // Adicionando as refeições
      Object.keys(meals).forEach((meal) => {
        if (meals[meal as keyof Meals].checked) {
          formData.append(`meals[${meal}]`, meals[meal as keyof Meals].value);
        }
      });

      const response = await apiClient().post("/trips/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Viagem cadastrada com sucesso!");
        updateCallbackTrips((prevRefresh: any) => !prevRefresh);

        handleCloseModal();
      }
    } catch (error: any) {
      setError(error);
      Alert.alert("Erro", "Erro ao criar viagem.");
    } finally {
      setLoading(false);
    }
  };

  const beautifyTitle = async () => {
    setLoadingEbelizeTitle(true);

    try {
      const { data } = await apiClient().post("/chat/embellish-title", {
        title,
      });
      setTitle(data.response);
    } catch (error) {
    } finally {
      setLoadingEbelizeTitle(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.containerErrorWithLoading}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerErrorWithLoading}>
        <Text style={styles.errorText}>
          Error fetching trips: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowOptions(false);
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenModal}>
          <View style={styles.iconContainer}>
            <Ionicons name="create-outline" size={32} color="#22172A" />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              style={styles.modalContent}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                  <Image
                    source={{ uri: headerImage }}
                    style={styles.headerImage}
                  />
                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={changeHeaderImage}
                  >
                    <Ionicons name="create-outline" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputTitleContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ah vamos lá! Dê um nome bacana para sua Viagem"
                    value={title}
                    onChangeText={setTitle}
                    editable={!loadingEmbelizeTitle}
                  />
                  {title ? (
                    <TouchableOpacity
                      onPress={beautifyTitle}
                      disabled={loadingEmbelizeTitle}
                    >
                      <Ionicons
                        name="sparkles"
                        color={loadingEmbelizeTitle ? "gray" : "#FF7029"}
                        size={24}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="De onde você está partindo? São Paulo?"
                      value={departureLocation}
                      onChangeText={(text) => {
                        setDepartureLocation(text);
                        setShowDepartureOptions(true);
                        searchLocations(
                          text,
                          setDepartureLocationOptions,
                          setLoadingDepartureSuggestions
                        );
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          if (!isFocused) {
                            setShowDepartureOptions(false);
                          }
                        }, 100);
                      }}
                    />
                    {departureLocation !== "" && (
                      <TouchableOpacity
                        onPress={() => setDepartureLocation("")}
                        style={styles.clearIcon}
                      >
                        <Ionicons name="close-circle" size={24} color="gray" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {showDepartureOptions && (
                    <View style={styles.optionsContainer}>
                      {loadingDepartureSuggestions ? (
                        <Text>Loading...</Text>
                      ) : (
                        departureLocationOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              handleLocationSelect(
                                option.name,
                                setDepartureLocation,
                                setShowDepartureOptions
                              );
                              setIsFocused(false);
                            }}
                            style={styles.optionItem}
                          >
                            <Text>
                              {option.name} - {option.country}
                            </Text>
                          </TouchableOpacity>
                        ))
                      )}
                    </View>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nos conte para onde você está indo? São Paulo?"
                      value={destinationLocation}
                      onChangeText={(text) => {
                        setDestinationLocation(text);
                        setShowDestinationOptions(true);
                        searchLocations(
                          text,
                          setDestinationLocationOptions,
                          setLoadingDestinationSuggestions
                        );
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          if (!isFocused) {
                            setShowDestinationOptions(false);
                          }
                        }, 100);
                      }}
                    />
                    {destinationLocation !== "" && (
                      <TouchableOpacity
                        onPress={() => setDestinationLocation("")}
                        style={styles.clearIcon}
                      >
                        <Ionicons name="close-circle" size={24} color="gray" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {showDestinationOptions && (
                    <View style={styles.optionsContainer}>
                      {loadingDestinationSuggestions ? (
                        <Text>Loading...</Text>
                      ) : (
                        destinationLocationOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              handleLocationSelect(
                                option.name,
                                setDestinationLocation,
                                setShowDestinationOptions
                              );
                              setIsFocused(false);
                            }}
                            style={styles.optionItem}
                          >
                            <Text>
                              {option.name} - {option.country}
                            </Text>
                          </TouchableOpacity>
                        ))
                      )}
                    </View>
                  )}
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Qual nome do lugar que você vai se hospedar?"
                  value={accommodation}
                  onChangeText={setAccommodation}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Duração da hospedagem (em dias)"
                  value={accommodationDuration}
                  onChangeText={setAccommodationDuration}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Valor total da hospedagem"
                  value={accommodationPrice}
                  onChangeText={setAccommodationPrice}
                  keyboardType="numeric"
                />

                <View style={styles.inputContainer}>
                  <CheckBox
                    title="Vai pegar avião?"
                    checked={isFlying}
                    onPress={() => setIsFlying(!isFlying)}
                  />

                  {isFlying && (
                    <Fragment>
                      <TouchableOpacity
                        style={styles.inputTouchable}
                        onPress={() => handleOpenDatePicker("departure")}
                      >
                        <Text style={styles.inputLabel}>
                          Data de partida do voo:
                        </Text>
                        <Text style={styles.inputText}>
                          {format(flightDepartureDate, "dd/MM/yyyy")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inputTouchable}
                        onPress={() => handleOpenDatePicker("return")}
                      >
                        <Text style={styles.inputLabel}>
                          Data de retorno do voo:
                        </Text>
                        <Text style={styles.inputText}>
                          {format(flightReturnDate, "dd/MM/yyyy")}
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

                      <TextInput
                        style={styles.input}
                        placeholder="Custo do voo"
                        value={flightCost}
                        onChangeText={setFlightCost}
                        keyboardType="numeric"
                      />
                    </Fragment>
                  )}
                </View>

                <View style={styles.bottomContainer}>
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    Refeição:
                  </Text>
                  <View style={styles.checkboxContainer}>
                    {Object.keys(meals).map((meal) => (
                      <CheckBox
                        key={meal}
                        title={meal.charAt(0).toUpperCase() + meal.slice(1)}
                        checked={meals[meal as keyof Meals].checked}
                        onPress={() => toggleMealOption(meal as keyof Meals)}
                      />
                    ))}
                  </View>

                  {Object.keys(meals).map((meal) =>
                    meals[meal as keyof Meals].visible ? (
                      <TextInput
                        key={meal}
                        style={[styles.input, styles.fullWidthInput]}
                        keyboardType="numeric"
                        placeholder={`Valor do ${meal}`}
                        onChangeText={(value) =>
                          updateMealValue(meal as keyof Meals, value)
                        }
                      />
                    ) : null
                  )}

                  <View style={styles.imageSlider}>
                    <ScrollView horizontal>
                      {images.map((image: any, index: number) => (
                        <View key={index}>
                          <Image source={{ uri: image }} style={styles.image} />
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteImage(index)}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={24}
                              color="#FFF"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addImage}
                      >
                        <Ionicons name="add" size={24} color="#FF7029" />
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
              <TouchableOpacity onPress={createTrip} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cadastrar Viagem</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerErrorWithLoading: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    height: windowHeight * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    height: 150,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  changeButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#FF7029",
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10,
    borderRadius: 6,
  },
  fullWidthInput: {
    width: "95%",
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageSlider: {
    marginTop: 20,
  },
  addButton: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF7029",
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    margin: 10,
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: "center",
  },
  inputContainer: {},
  inputTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  inputTouchable: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10,
    borderRadius: 6,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputText: {
    fontSize: 14,
    color: "#666",
  },
  clearButton: {
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF7029",
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearIcon: {
    marginLeft: 5,
  },
});
