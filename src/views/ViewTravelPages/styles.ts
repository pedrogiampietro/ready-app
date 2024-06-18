import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  tabContainer: {
    marginTop: 40,
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  scrollViewStyle: {
    maxHeight: 200,
    overflow: "scroll",
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    padding: 20,
  },
  expenseCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  expenseInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    width: 200,
    marginRight: 10,
    padding: 8,
  },
  addButton: {
    backgroundColor: "#FF7029",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  savingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  removeText: {
    color: "red",
    marginLeft: 10,
  },
  restaurantCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantBudget: {
    fontSize: 14,
    color: "#7D848D",
  },
  restaurantUrl: {
    fontSize: 14,
    color: "#1E90FF",
  },
  itineraryCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itineraryActivity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itineraryDate: {
    fontSize: 14,
    color: "#7D848D",
  },
  itineraryDescription: {
    fontSize: 14,
    color: "#444",
  },
});

export default styles;
