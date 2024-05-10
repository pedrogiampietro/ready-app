import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLoadFonts } from './fonts/useLoadFonts';
import { Navigator } from './components/Navigator';
import AppLoading from 'expo-app-loading';

preventAutoHideAsync().catch(console.error);

export const App = () => {
	const { areFontsLoaded } = useLoadFonts();

	if (!areFontsLoaded) {
		return <AppLoading />;
	}

	hideAsync().catch(console.error);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Navigator />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};
