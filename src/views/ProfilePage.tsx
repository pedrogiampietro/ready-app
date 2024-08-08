import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { apiClient } from "../services/api";
import * as ImagePicker from "expo-image-picker";

export const ProfilePage = () => {
  const { user, logout, setUser } = useAuth();
  const navigation = useNavigation() as any;
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar_url || "");
  const [avatarUri, setAvatarUri] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigation.navigate("LoginPage");
  };

  const changeHeaderImage = async () => {
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
      } else {
        setAvatarUri(assets[0]?.uri);
        setAvatar(assets[0]?.uri);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData() as any;
    formData.append("name", name);
    formData.append("userId", user?.id);
    if (avatarUri) {
      formData.append("avatar", {
        uri: avatarUri,
        type: "image/jpeg",
        name: "avatar.jpg",
      });
    }

    try {
      const response = await apiClient().put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUser({
          ...user,
          name: response.data.name,
          avatar_url: response.data.avatar_url,
          bucket_url: response.data.bucket_url,
        });
        ToastAndroid.show("Perfil atualizado com sucesso!", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("error", error);
      ToastAndroid.show("Erro ao atualizar perfil.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                avatar.length <= 3
                  ? `http://192.168.0.68:3333/tmp/${user?.avatar_url}`
                  : user?.bucket_url,
            }}
          />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={changeHeaderImage}
          >
            <Ionicons name="create-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  changeButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF7029",
    borderRadius: 50,
    padding: 5,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
