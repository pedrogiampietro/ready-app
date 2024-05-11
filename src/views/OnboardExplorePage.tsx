import {
	SafeAreaView,
	Image,
	Text,
	Button,
	StyleSheet,
	View,
	Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PressableButton } from '../components/PressableButton';

const { width, height } = Dimensions.get('window');

export const OnboardExplorePage = () => {
	return (
		<View style={styles.container}>
			<StatusBar style='light' />
			<Image
				style={styles.image}
				source={require('../../assets/onboard-explore.png')}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					É um grande mundo lá fora, vá
					<Text style={styles.highlight}> explorar</Text>
				</Text>
				<View style={styles.lineContainer}>
					<Image source={require('../../assets/onboard-line.png')} />
				</View>
				<Text style={styles.subTextContainer}>
					Para aproveitar ao máximo sua aventura você só precisa sair e ir para
					onde quiser. estamos esperando por você
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<PressableButton text='Próximo' redirectTo='OnboardPeoplePage' />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '100%',
		height: '50%',
		resizeMode: 'cover',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	textContainer: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 0.05 * width,
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
	buttonsContainer: {
		flex: 1,
		paddingTop: 0.05 * height,
		marginHorizontal: 0.05 * width,
	},
});
