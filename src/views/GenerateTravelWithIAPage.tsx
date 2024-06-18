import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { apiClient } from "../services/api";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Loading } from "../components/Loading";
import { TravelPlanModal } from "../components/TravelPlanModal";

interface LocationOption {
  name: string;
  country: string;
  population: number;
}

export const GenerateTravelWithIAPage = () => {
  const navigation = useNavigation() as any;
  const [classLevel, setClassLevel] = useState("média");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("luxo");
  const [comfortableWithPublicTransport, setComfortableWithPublicTransport] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [flightDepartureDate, setFlightDepartureDate] = useState(new Date());
  const [flightReturnDate, setFlightReturnDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"departure" | "return">(
    "departure"
  );
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
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState({});
  const [showModal, setShowModal] = useState(false);

  const activitiesItems = [
    { name: "Vida noturna", id: "vida noturna" },
    { name: "Museus", id: "museus" },
    { name: "Parques", id: "parques" },
    { name: "Shoppings", id: "shoppings" },
    { name: "Eventos culturais", id: "eventos culturais" },
  ];

  const handleBack = () => {
    navigation.navigate("HomePage");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const travelPreferences = {
      classLevel,
      budget,
      travelStyle,
      selectedItems,
      comfortableWithPublicTransport,
      departureLocation,
      destinationLocation,
      flightDepartureDate,
      flightReturnDate,
    };

    try {
      const result = await apiClient().post("/chat", travelPreferences);
      setTravelPlan(result.data.response);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao gerar viagem:", error);
    } finally {
      setLoading(false);
    }
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

  const searchLocations = async (
    query: string,
    type: "departure" | "destination"
  ) => {
    try {
      const response = await axios.get(
        `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=abhiaiyer`
      );
      if (type === "departure") {
        setDepartureLocationOptions(
          response.data.geonames.map((item: any) => ({
            name: item.name,
            country: item.countryName,
            population: item.population,
          }))
        );
      } else {
        setDestinationLocationOptions(
          response.data.geonames.map((item: any) => ({
            name: item.name,
            country: item.countryName,
            population: item.population,
          }))
        );
      }
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
      if (type === "departure") {
        setDepartureLocationOptions([]);
      } else {
        setDestinationLocationOptions([]);
      }
    }
  };

  const handleLocationSelect = (
    selectedLocation: string,
    type: "departure" | "destination"
  ) => {
    if (type === "departure") {
      setDepartureLocation(selectedLocation);
      setShowDepartureOptions(false);
    } else {
      setDestinationLocation(selectedLocation);
      setShowDestinationOptions(false);
    }
  };

  const handleSaveTrip = async () => {
    setLoading(true);

    const payload = {
      travelPlan,
      classLevel,
      budget,
      travelStyle,
      selectedItems,
      comfortableWithPublicTransport,
      departureLocation,
      destinationLocation,
      flightDepartureDate,
      flightReturnDate,
      userId: "b8374eed-dca3-4e38-92d6-a70083531cea",
    };

    try {
      await apiClient().post("/trips/save-with-ia", payload);
      alert("Viagem salva com sucesso!");
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar viagem:", error);
      alert("Erro ao salvar viagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gere sua viagem com IA!</Text>
        <Text style={styles.subtitle}>
          Informe alguns detalhes para gerar sua viagem
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de partida do voo:</Text>
        <TouchableOpacity
          style={styles.inputTouchable}
          onPress={() => handleOpenDatePicker("departure")}
        >
          <Text style={styles.inputText}>
            {format(flightDepartureDate, "dd/MM/yyyy")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de retorno do voo:</Text>
        <TouchableOpacity
          style={styles.inputTouchable}
          onPress={() => handleOpenDatePicker("return")}
        >
          <Text style={styles.inputText}>
            {format(flightReturnDate, "dd/MM/yyyy")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.label}>Está partindo de onde?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rio de Janeiro"
          value={departureLocation}
          onChangeText={(text) => {
            setDepartureLocation(text);
            setShowDepartureOptions(true);
            searchLocations(text, "departure");
          }}
        />
        {showDepartureOptions && (
          <View style={styles.optionsContainer}>
            {departureLocationOptions.map(
              (option: LocationOption, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLocationSelect(option.name, "departure")}
                  style={styles.optionItem}
                >
                  <Text>
                    {option.name} - {option.country}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>
      <View>
        <Text style={styles.label}>Está indo para onde?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: São Paulo"
          value={destinationLocation}
          onChangeText={(text) => {
            setDestinationLocation(text);
            setShowDestinationOptions(true);
            searchLocations(text, "destination");
          }}
        />
        {showDestinationOptions && (
          <View style={styles.optionsContainer}>
            {destinationLocationOptions.map(
              (option: LocationOption, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleLocationSelect(option.name, "destination")
                  }
                  style={styles.optionItem}
                >
                  <Text>
                    {option.name} - {option.country}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>
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
      <View>
        <Text style={styles.label}>Informe sua classe social:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={classLevel}
            style={styles.picker}
            onValueChange={(itemValue) => setClassLevel(itemValue)}
          >
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Média" value="média" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>
        </View>
        <Text style={styles.label}>Orçamento total pela viagem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1000"
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />
        <Text style={styles.label}>Seu estilo de viagem:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={travelStyle}
            style={styles.picker}
            onValueChange={(itemValue) => setTravelStyle(itemValue)}
          >
            <Picker.Item label="Luxo" value="luxo" />
            <Picker.Item label="Conforto" value="conforto" />
            <Picker.Item label="Praticidade" value="praticidade" />
            <Picker.Item label="Econômico" value="econômico" />
          </Picker>
        </View>
        <Text style={styles.label}>O que você gosta de fazer:</Text>
        <View style={styles.pickerContainer}>
          <SectionedMultiSelect
            items={activitiesItems}
            IconRenderer={Icon as any}
            uniqueKey="id"
            subKey="items"
            selectedItems={selectedItems}
            selectText="Selecione as opções..."
            searchPlaceholderText="Buscar atividades..."
            onSelectedItemsChange={setSelectedItems}
            confirmText="Confirmar"
            colors={{ primary: "#FF7029" }}
          />
        </View>
        <Text style={styles.label}>Confortável com transporte público:</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {comfortableWithPublicTransport ? "Sim" : "Não"}
          </Text>
          <Switch
            value={comfortableWithPublicTransport}
            onValueChange={setComfortableWithPublicTransport}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <Loading />
        ) : (
          <Text style={styles.generateText}>Gerar Viagem</Text>
        )}
      </TouchableOpacity>
      <TravelPlanModal
        visible={showModal}
        travelPlan={travelPlan}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTrip} // Pass the handleSaveTrip function
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
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
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
  },
  generateButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  generateText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 10,
    color: "#FFF",
  },
  inputTouchable: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#FFF",
    padding: 10,
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
  optionsContainer: {
    marginTop: 5,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
