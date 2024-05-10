import {
  SafeAreaView,
  Image,
  Text,
  Button,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PressableButton } from "../components/PressableButton";

export const OnboardPeoplePage = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={require("../../assets/onboard-people.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          As pessoas não fazem viagens, as viagens levam as
          <Text style={styles.highlight}> pessoas</Text>
        </Text>
        <View style={styles.lineContainer}>
          <Image source={require("../../assets/onboard-line.png")} />
        </View>
        <Text style={styles.subTextContainer}>
          As pessoas não fazem viagens, as viagens levam as pessoas Para
          aproveitar ao máximo sua aventura você só precisa sair e ir para onde
          quiser. estamos esperando por você
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <PressableButton text="Próximo" redirectTo="LoginScreen" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  subTextContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
    color: "#7D848D",
    fontSize: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  highlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7029",
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 140,
  },
  buttonsContainer: {
    paddingTop: 70,
    marginHorizontal: 20,
  },
});
