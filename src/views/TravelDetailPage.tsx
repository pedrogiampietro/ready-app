import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const TravelDetailPage = () => {
	const navigation = useNavigation() as any;

	const totalImages = 16;
	const imagesToShow = 5;

	const handleBack = () => {
		navigation.navigate('HomeTabs');
	};

	return (
		<View style={styles.container}>
			<StatusBar style='dark' />
			<Image
				style={styles.image}
				source={require('../../assets/background-detail.png')}
			/>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack}>
					<Ionicons name='arrow-back' size={24} color='#333' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Details</Text>
				<Ionicons name='bookmark-outline' size={24} color='#333' />
			</View>
			<View style={styles.card}>
				<Text style={styles.title}>Nome do Lugar</Text>
				<View style={styles.cardHeader}>
					<View style={styles.textIconGroup}>
						<Ionicons name='location-outline' size={14} color='#333' />
						<Text style={styles.location}>Localização</Text>
					</View>
					<View style={styles.textIconGroup}>
						<Ionicons name='star' size={14} color='#FFD336' />
						<Text style={styles.rating}>4.7 (2498)</Text>
					</View>
					<View style={styles.textIconGroup}>
						<Text
							style={[styles.price, { color: 'green', fontWeight: 'bold' }]}
						>
							R$
						</Text>
						<Text style={styles.price}>1235/Viagem</Text>
					</View>
				</View>

				<View style={styles.albumContainer}>
					{[...Array(imagesToShow)].map((_, index) => {
						return (
							<Image
								key={index}
								style={styles.albumImageCard}
								source={require('../../assets/background-detail.png')}
							/>
						);
					})}
					{totalImages > imagesToShow && (
						<View style={styles.moreImages}>
							<Text style={styles.moreImagesText}>
								+{totalImages - imagesToShow}
							</Text>
						</View>
					)}
				</View>

				<Text style={styles.infoTitle}>Informações da Viagem</Text>
				<ScrollView showsHorizontalScrollIndicator>
					<Text style={styles.infoText}>
						A viagem foi simplesmente incrível! Tudo o que planejamos foi
						realizado com sucesso e ainda superou nossas expectativas. Desde o
						momento em que embarcamos até o nosso retorno, cada momento foi
						repleto de alegria e emoção. As paisagens que vimos eram de tirar o
						fôlego, as pessoas que conhecemos ao longo do caminho eram amigáveis
						e acolhedoras, e a comida... ah, a comida era de outro mundo! Cada
						refeição era uma nova aventura culinária que nos deixava ansiosos
						pela próxima. E a melhor parte? Conseguimos fazer tudo isso e ainda
						economizar! Graças ao nosso planejamento cuidadoso e à nossa
						disposição para buscar as melhores ofertas, conseguimos aproveitar
						ao máximo nossa viagem sem estourar o orçamento. Na verdade, até
						sobrou dinheiro! No final, esta viagem não foi apenas uma chance de
						ver novos lugares e experimentar novas coisas. Foi uma jornada de
						autodescoberta e crescimento pessoal que nos deixou com lembranças
						que vamos valorizar para sempre. Mal podemos esperar pela próxima!
					</Text>
				</ScrollView>
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
	image: {
		width: width,
		height: height / 2,
	},
	card: {
		position: 'absolute',
		top: height / 2 - 50,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
	},
	textIconGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginVertical: 16,
		gap: 10,
	},
	location: {
		fontSize: 14,
		color: '#888',
	},
	rating: {
		fontSize: 14,
		color: '#888',
	},
	price: {
		fontSize: 14,
		color: '#888',
	},
	infoTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
	},
	infoText: {
		fontSize: 16,
		color: '#444',
		marginTop: 10,
	},
	albumContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 15,
	},
	albumImageCard: {
		width: 42,
		height: 42,
		borderRadius: 12,
	},
	moreImages: {
		width: 42,
		height: 42,
		borderRadius: 12,
		backgroundColor: '#000000af',
		justifyContent: 'center',
		alignItems: 'center',
	},
	moreImagesText: {
		color: '#fff',
		fontSize: 14,
	},
});
