import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PressableButton } from '../components/PressableButton';
import { useNavigation } from '@react-navigation/native';

export const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation() as any;

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleBack = () => {
		navigation.navigate('OnboardPeoplePage');
	};

	// const handleLogin = () => {
	// 	navigation.navigate('HomePage');
	// };

	const handleRegister = () => {
		navigation.navigate('RegisterPage');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack}>
					<Ionicons name='arrow-back' size={24} color='black' />
				</TouchableOpacity>
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Faça login agora</Text>
				<Text style={styles.subtitle}>
					Por favor, faça login para continuar para o app
				</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Email'
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<View style={styles.passwordInput}>
					<TextInput
						style={[styles.input, { paddingRight: 40 }]}
						placeholder='Senha'
						secureTextEntry={!showPassword}
						onChangeText={(text) => setPassword(text)}
						value={password}
					/>
					<TouchableOpacity
						onPress={toggleShowPassword}
						style={styles.showPasswordButton}
					>
						<Ionicons
							name={showPassword ? 'eye-off' : 'eye'}
							size={24}
							color='black'
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.forgotPasswordButton}>
					<Text style={styles.forgotPasswordText}>Perdeu sua senha?</Text>
				</TouchableOpacity>
			</View>
			<PressableButton text='Entrar' redirectTo='HomePage' />
			<View style={styles.signupContainer}>
				<Text style={styles.signupText}>Você ainda não tem uma conta?</Text>
				<TouchableOpacity onPress={handleRegister}>
					<Text style={styles.signupLink}>Crie aqui</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 50,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 20,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 16,
		color: 'gray',
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		width: '100%',
		height: 50,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 10,
		paddingHorizontal: 15,
		marginBottom: 10,
	},
	passwordInput: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	showPasswordButton: {
		position: 'absolute',
		right: 10,
		padding: 10,
	},
	forgotPasswordButton: {
		alignItems: 'flex-end',
		marginBottom: 20,
	},
	forgotPasswordText: {
		color: '#FF7029',
		marginTop: 10,
	},
	signupContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	signupText: {
		marginRight: 5,
	},
	signupLink: {
		color: '#FF7029',
	},
});
