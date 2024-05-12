import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CalendarPage = () => {
	const navigation = useNavigation() as any;

	const handleBack = () => {
		navigation.navigate('HomeTabs');
	};

	return (
		<View style={styles.container}>
			<StatusBar style='dark' />

			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack}>
					<Ionicons name='arrow-back' size={24} color='#333' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Calendário</Text>
				<Ionicons name='bookmark-outline' size={24} color='#333' />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 40,
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});
