import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HotelCard } from "../../components/HotelCard";
import styles from "./styles";
import { formatDate } from "../../utils";

const GeneralScreen = ({ trip }: any) => {
  const [showFullText, setShowFullText] = useState(false);
  const [dailySavings, setDailySavings] = useState<any>([]);
  const [savingsInput, setSavingsInput] = useState<any>("");

  const startDate = new Date(trip.departureDate);
  const endDate = new Date(trip.returnDate);
  const initialNumberOfDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const travelExpenses = [
    { id: 1, description: "Passagens aéreas", amount: trip.flightCost },
    { id: 2, description: "Hospedagem", amount: trip.hotelPrice },
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
      <View style={{ alignItems: "center" }}>
        <Text style={styles.infoTitle}>Informações da Viagem</Text>
        <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator>
          <Text style={styles.infoText}>
            {showFullText
              ? trip.observacoes.join(" ")
              : `${trip.observacoes.join(" ").substring(0, 100)}...`}
            {!showFullText && (
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
      <HotelCard
        hotelName={trip.hotelName}
        address={trip.destinationLocation}
        checkInDate={formatDate(trip.departureDate)}
        checkOutDate={formatDate(trip.returnDate)}
        quantityBads="2"
        duration={trip.accommodationDuration.toString()}
      />

      <View style={styles.expenseCard}>
        <Text style={[styles.infoTitle, { marginTop: 0 }]}>
          Gastos da Viagem
        </Text>
        {travelExpenses.map((expense) => (
          <Text key={expense.id}>
            {expense.description.includes("Hospedagem")
              ? `${expense.description}: R$ ${expense.amount.toFixed(
                  2
                )} * ${trip.accommodationDuration.toString()}`
              : `${expense.description}: R$ ${expense.amount.toFixed(2)}`}
          </Text>
        ))}
        <Text style={{ fontWeight: "bold" }}>
          Total: R$ {trip.totalCost.toFixed(2)}
        </Text>
        <Text>Dias até a viagem: {initialNumberOfDays}</Text>
        <Text>Valor diário a economizar: R$ {dailyBudget.toFixed(2)}</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={addDailySaving}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.expenseCard}>
        <Text style={[styles.infoTitle, { marginTop: 0 }]}>
          Economias Diárias
        </Text>
        {dailySavings.map((saving: any, index: any) => (
          <View key={index} style={styles.savingItem}>
            <Text>
              Data: {saving.date} - Economia: R$ {saving.amount.toFixed(2)}
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
    </ScrollView>
  );
};

export default GeneralScreen;
