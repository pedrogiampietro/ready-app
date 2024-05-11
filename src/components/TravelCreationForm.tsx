import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

export const TravelCreationForm = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
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
					<View style={styles.modalContent}>
						<Text>Oi</Text>
						<Image
							style={styles.image}
							source={{ uri: 'https://example.com/image.png' }}
						/>
					</View>
					<TouchableOpacity
						onPress={handleCloseModal}
						style={styles.closeButton}
					>
						<Text style={styles.closeButtonText}>Fechar</Text>
					</TouchableOpacity>
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
	},
	modalContent: {
		backgroundColor: 'white',
		height: windowHeight * 0.77,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: 'center',
	},
	image: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: '#FF7029',
		padding: 18,
		alignItems: 'center',
	},
	closeButtonText: {
		fontWeight: 'bold',
		color: '#FFF',
	},
});
