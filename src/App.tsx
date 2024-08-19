import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadFonts } from "./fonts/useLoadFonts";
import { Navigator } from "./components/Navigator";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./context/AuthContext";
import "expo-dev-client";

SplashScreen.preventAutoHideAsync().catch(console.error);

export const App = () => {
  const { areFontsLoaded } = useLoadFonts();

  useEffect(() => {
    if (areFontsLoaded) {
      SplashScreen.hideAsync().catch(console.error);
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
