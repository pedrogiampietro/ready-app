import { Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PressableButton } from '../components/PressableButton';

const { width, height } = Dimensions.get('window');

export const OnboardWidePage = () => {
	return (
		<View style={styles.container}>
			<StatusBar style='light' />
			<Image
				style={styles.image}
				source={require('../../assets/onboard-wide.png')}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					A vida é curta e o mundo é<Text style={styles.highlight}> vasto</Text>
				</Text>
				<View style={styles.lineContainer}>
					<Image source={require('../../assets/onboard-line.png')} />
				</View>
				<Text style={styles.subTextContainer}>
					No Pronto para viajar personalizamos passeios educacionais confiáveis
					​​e confiáveis ​​para destinos em todo o mundo
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<PressableButton text='Começar' redirectTo='OnboardExplorePage' />
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
		marginLeft: 0.05 * width,
	},
	buttonsContainer: {
		flex: 1,
		paddingTop: 0.05 * height,
		marginHorizontal: 0.05 * width,
	},
});
