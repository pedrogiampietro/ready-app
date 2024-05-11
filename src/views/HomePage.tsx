import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AvatarStack } from '../components/AvatarStack';

const { width, height } = Dimensions.get('window');

const data = [
	{
		image:
			'https://cursinhoparamedicina.com.br/wp-content/uploads/2022/10/Paisagem-1.jpg',
		title: 'Viagem 1',
		location: 'Lugar 1',
		likes: 50,
	},
	{
		image:
			'https://cursinhoparamedicina.com.br/wp-content/uploads/2022/10/Paisagem-1.jpg',
		title: 'Viagem 2',
		location: 'Lugar 2',
		likes: 60,
	},
	{
		image:
			'https://cursinhoparamedicina.com.br/wp-content/uploads/2022/10/Paisagem-1.jpg',
		title: 'Viagem 3',
		location: 'Lugar 3',
		likes: 70,
	},
	{
		image:
			'https://cursinhoparamedicina.com.br/wp-content/uploads/2022/10/Paisagem-1.jpg',
		title: 'Viagem 4',
		location: 'Lugar 4',
		likes: 80,
	},
];

export const HomePage = () => {
	return (
		<View style={styles.container}>
			<StatusBar style='dark' />
			<View style={styles.header}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: 'https://github.com/pedrogiampietro.png' }}
					/>
					<Text style={styles.userName}>Pedro Giampietro</Text>
				</View>
				<Ionicons name='notifications-circle' size={32} color='#22172A' />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					Explore o mundo {'  '}
					<Text style={styles.highlight}> bonito</Text> !
				</Text>
				<View style={styles.lineContainer}>
					<Image source={require('../../assets/onboard-line.png')} />
				</View>
			</View>

			<View style={styles.sliderHeader}>
				<Text style={styles.sliderTitle}>As melhores viagens</Text>
				<Text style={styles.viewAll}>Ver tudo</Text>
			</View>

			<ScrollView
				horizontal
				alwaysBounceVertical
				showsHorizontalScrollIndicator={false}
			>
				{data.map((item, index) => (
					<View key={index} style={styles.card}>
						<Image style={styles.cardImage} source={{ uri: item.image }} />
						<Text style={styles.cardTitle}>{item.title}</Text>
						<View style={styles.locationContainer}>
							<View style={styles.locationGroup}>
								<Ionicons name='location-outline' size={14} color='#22172A' />
								<Text style={styles.locationText}>{item.location}</Text>
							</View>

							<View style={styles.likesContainer}>
								<View style={styles.avatarsContainer}>
									<AvatarStack />
									<Text style={styles.likesText}>+{item.likes}</Text>
								</View>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
	},
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		marginRight: 10,
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	textContainer: {
		textAlign: 'center',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginTop: 0.05 * height,
	},
	subTextContainer: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 0.05 * width,
		marginTop: 0.05 * height,
		color: '#7D848D',
		fontSize: 15,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
	},
	highlight: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#FF7029',
	},
	lineContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 0.2 * width,
	},
	sliderContainer: {
		flex: 1,
		marginTop: 20,
		textAlign: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	sliderHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 10,
	},
	sliderTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	viewAll: {
		fontSize: 14,
		color: '#FF7029',
	},
	card: {
		width: 238,
		height: 320,
		borderRadius: 10,
		overflow: 'hidden',
		marginRight: 20,
	},
	cardImage: {
		width: '100%',
		height: '80%',
	},
	cardTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10,
		marginLeft: 10,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: 10,
	},
	locationGroup: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	locationText: {
		fontSize: 16,
		marginLeft: 5,
		color: '#7D848D',
	},
	likesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
	},
	avatarsContainer: {
		flexDirection: 'row',
	},
	likesText: {
		fontSize: 14,
		marginLeft: 10,
	},
});
