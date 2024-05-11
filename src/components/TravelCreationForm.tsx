import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export const TravelCreationForm = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [images, setImages] = useState<any>([]);
	const [headerImage, setHeaderImage] = useState<any>(
		'https://www.remessaonline.com.br/blog/wp-content/uploads/2022/05/viagem-para-cancun.jpg'
	);

	const [accommodation, setAccommodation] = useState('');
	const [accommodationDuration, setAccommodationDuration] = useState('');

	const [flightDepartureDate, setFlightDepartureDate] = useState('');
	const [flightReturnDate, setFlightReturnDate] = useState('');
	const [flightCost, setFlightCost] = useState('');

	const [mealOptions, setMealOptions] = useState({
		breakfast: false,
		lunch: false,
		dinner: false,
	});

	const [mealInputsVisible, setMealInputsVisible] = useState<any>({
		breakfast: false,
		lunch: false,
		dinner: false,
	});

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
				'Permissão necessária',
				'Permita que sua aplicação acesse as imagens'
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
				ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
			} else {
				setImages([...images, assets[0]?.uri]);
			}
		}
	};

	const changeHeaderImage = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) {
			Alert.alert(
				'Permissão necessária',
				'Permita que sua aplicação acesse as imagens'
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
				ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
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

	const toggleMealInputVisibility = (meal: string) => {
		setMealInputsVisible((prevState: any) => ({
			...prevState,
			[meal]: !prevState[meal],
		}));
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleOpenModal}>
				<View style={styles.iconContainer}>
					<Ionicons name='create-outline' size={32} color='#22172A' />
				</View>
			</TouchableOpacity>

			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={handleCloseModal}
			>
				<View style={styles.overlay} />
				<View style={styles.modalContainer}>
					<KeyboardAvoidingView
						style={styles.modalContent}
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
									<Ionicons name='create-outline' size={24} color='#FFF' />
								</TouchableOpacity>
							</View>
							<TextInput
								style={styles.input}
								placeholder='Título da viagem'
								value={title}
								onChangeText={setTitle}
							/>
							<TextInput
								style={styles.input}
								placeholder='Localização'
								value={location}
								onChangeText={setLocation}
							/>

							<TextInput
								style={styles.input}
								placeholder='Hospedagem'
								value={accommodation}
								onChangeText={setAccommodation}
							/>
							<TextInput
								style={styles.input}
								placeholder='Duração da hospedagem (em dias)'
								value={accommodationDuration}
								onChangeText={setAccommodationDuration}
								keyboardType='numeric'
							/>

							<TextInput
								style={styles.input}
								placeholder='Data de partida do voo'
								value={flightDepartureDate}
								onChangeText={setFlightDepartureDate}
							/>
							<TextInput
								style={styles.input}
								placeholder='Data de retorno do voo'
								value={flightReturnDate}
								onChangeText={setFlightReturnDate}
							/>
							<TextInput
								style={styles.input}
								placeholder='Custo do voo'
								value={flightCost}
								onChangeText={setFlightCost}
								keyboardType='numeric'
							/>

							<View style={styles.bottomContainer}>
								<Text style={{ fontSize: 18, marginBottom: 10 }}>
									Refeição:
								</Text>
								<View style={styles.checkboxContainer}>
									<View style={styles.checkboxItem}>
										<TouchableOpacity
											onPress={() => {
												setMealOptions({
													...mealOptions,
													breakfast: !mealOptions.breakfast,
												});
												toggleMealInputVisibility('breakfast');
											}}
										>
											<Ionicons
												name={
													mealOptions.breakfast ? 'checkbox' : 'square-outline'
												}
												size={24}
												color='#000'
											/>
										</TouchableOpacity>
										<Text style={styles.checkboxText}>Café</Text>
									</View>
									<View style={styles.checkboxItem}>
										<TouchableOpacity
											onPress={() => {
												setMealOptions({
													...mealOptions,
													lunch: !mealOptions.lunch,
												});
												toggleMealInputVisibility('lunch');
											}}
										>
											<Ionicons
												name={mealOptions.lunch ? 'checkbox' : 'square-outline'}
												size={24}
												color='#000'
											/>
										</TouchableOpacity>
										<Text style={styles.checkboxText}>Almoço</Text>
									</View>
									<View style={styles.checkboxItem}>
										<TouchableOpacity
											onPress={() => {
												setMealOptions({
													...mealOptions,
													dinner: !mealOptions.dinner,
												});
												toggleMealInputVisibility('dinner');
											}}
										>
											<Ionicons
												name={
													mealOptions.dinner ? 'checkbox' : 'square-outline'
												}
												size={24}
												color='#000'
											/>
										</TouchableOpacity>
										<Text style={styles.checkboxText}>Jantar</Text>
									</View>
								</View>

								{mealInputsVisible.breakfast && (
									<TextInput
										style={styles.input}
										placeholder='Valor do café'
										onChangeText={(value) => {}}
									/>
								)}
								{mealInputsVisible.lunch && (
									<TextInput
										style={styles.input}
										placeholder='Valor do almoço'
										onChangeText={(value) => {}}
									/>
								)}
								{mealInputsVisible.dinner && (
									<TextInput
										style={styles.input}
										placeholder='Valor do jantar'
										onChangeText={(value) => {}}
									/>
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
														name='trash-outline'
														size={24}
														color='#FFF'
													/>
												</TouchableOpacity>
											</View>
										))}
										<TouchableOpacity
											style={styles.addButton}
											onPress={addImage}
										>
											<Ionicons name='add' size={24} color='#FF7029' />
										</TouchableOpacity>
									</ScrollView>
								</View>
							</View>
						</ScrollView>
						<TouchableOpacity
							onPress={handleCloseModal}
							style={styles.closeButton}
						>
							<Text style={styles.closeButtonText}>Fechar</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iconContainer: {
		alignItems: 'flex-end',
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		height: windowHeight * 0.8, // Alterado para ocupar 80% da tela
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: '100%', // Garantindo que ocupa toda a largura
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		height: 150,
	},
	headerImage: {
		width: '100%',
		height: '100%',
	},
	changeButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
	},
	image: {
		width: 64,
		height: 64,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: '#FF7029',
		padding: 18,
		alignItems: 'center',
		marginTop: 20,
	},
	closeButtonText: {
		fontWeight: 'bold',
		color: '#FFF',
	},
	input: {
		width: '95%',
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		margin: 10,
		borderRadius: 6,
	},
	imageSlider: {
		marginTop: 20,
	},
	addButton: {
		width: 64,
		height: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#FF7029',
		borderRadius: 5,
		marginRight: 10,
	},
	deleteButton: {
		position: 'absolute',
		top: 5,
		right: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 12,
		padding: 4,
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	checkboxItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	checkboxText: {
		margin: 10,
		fontSize: 16,
	},
	bottomContainer: {
		alignItems: 'center',
	},
});
