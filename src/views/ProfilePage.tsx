import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { apiClient } from "../services/api";
import * as ImagePicker from "expo-image-picker";
import { formatDate, getInitials } from "../utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ProfilePage = () => {
  const { user, logout, setUser } = useAuth();
  const navigation = useNavigation() as any;
  const [name, _] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar_url || "");
  const [avatarUri, setAvatarUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigation.navigate("LoginPage");
    }, 0);
  };

  const handlePaymentRedirect = () => {
    navigation.navigate("PlansPage");
  };

  const changeProfileImage = async () => {
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita que sua aplicação acesse as imagens"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 0.5, // Ajuste a qualidade para reduzir o tamanho do arquivo
      });

      if (result.canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
        return;
      }

      const selectedAsset = result.assets && result.assets[0];
      if (selectedAsset) {
        if (selectedAsset.fileSize > MAX_FILE_SIZE) {
          Alert.alert(
            "Erro",
            "A imagem selecionada é muito grande. Por favor, selecione uma imagem menor."
          );
          return;
        }

        setAvatarUri(selectedAsset.uri);
        setAvatar(selectedAsset.uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao acessar a galeria. Tente novamente."
      );
    }
  };

  const handleSave = async () => {
    if (!avatarUri) {
      ToastAndroid.show("Nenhuma imagem selecionada.", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userId", user?.id);
    formData.append("avatar", {
      uri: avatarUri,
      type: "image/jpeg",
      name: "avatar.jpg",
    });

    try {
      const api = await apiClient();
      const response = await api.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setUser({
          ...user,
          bucket_url: response.data.bucket_url,
        });
        ToastAndroid.show("Perfil atualizado com sucesso!", ToastAndroid.SHORT);
      } else {
        const errorMessage =
          response.data.message || "Erro ao atualizar perfil.";
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);

      if (error.response && error.response.status === 413) {
        Alert.alert(
          "Erro",
          "O arquivo enviado é muito grande. Por favor, selecione um arquivo menor."
        );
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF7029" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF7029" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          {avatar || user?.bucket_url ? (
            <Image
              style={styles.avatar}
              source={{
                uri: avatarUri ? avatarUri : user?.bucket_url,
              }}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>
                {getInitials(user?.name || "User")}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.changeButton}
            onPress={changeProfileImage}
          >
            <Ionicons name="create-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.joinDate}>
          Ingressou em {formatDate(user?.created_at)}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.totalTrips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.setting}
          onPress={handlePaymentRedirect}
        >
          <Ionicons name="wallet-outline" size={24} color="#fff" />
          <Text style={styles.settingText}>Pagamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
          <Text style={styles.settingText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.settingText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Ionicons name="language-outline" size={24} color="#fff" />
          <Text style={styles.settingText}>Linguagem</Text>
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
        {/* <View style={styles.setting}>
          <Ionicons name="moon-outline" size={24} color="#fff" />
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
          />
        </View> */}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2b1a12",
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
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#FF7029",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  changeButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2b1a12",
    borderRadius: 50,
    padding: 5,
  },
  name: {
    fontSize: 18,
    color: "#FF7029",
    fontWeight: "bold",
  },
  joinDate: {
    color: "#b3b3b3",
    fontSize: 14,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    color: "#FF7029",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  settingsContainer: {
    borderColor: "#3b2416",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingText: {
    color: "#FF7029",
    fontSize: 16,
    marginLeft: 20,
    flex: 1,
  },
  languageText: {
    color: "#FF7029",
    fontSize: 16,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF7029",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
