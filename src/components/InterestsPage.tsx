import React, { useState } from 'react';
import {
	View,
	Text,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Button,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const interests = [
	'CS-GO',
	'Attack-on-Titan',
	'Valorant',
	'Bleach',
	'Tibia',
	'Hunter x Hunter',
	'Mu-online',
	'Dragon Ball Z',
	'Fortnite',
	'Fall Guys',
	'Naruto Shippuden',
	'Genshin Impact',
	'One Punch Man',
	'Apex Legends',
	'Jujutsu Kaisen',
	'PUBG',
	'Inuyasha',
	'Grand Theft Auto',
	'My Hero Academia',
	'Super Mario',
	'Vinland Saga',
	'Zelda',
	'Berserk',
	'Elden Ring',
	'One Piece',
	'Call of Duty',
	'Attack on Titan',
	'God of War',
	'Demon Slayer',
	'Fifa',
	'Sword Art Online',
	'League of Legends',
	'Solo Leveling',
	'The Sims',
];

export const InterestsPage = () => {
	const [selectedInterests, setSelectedInterests] = useState([]);
	const navigation = useNavigation();

	const toggleInterest = (interest) => {
		if (selectedInterests.includes(interest)) {
			setSelectedInterests(selectedInterests.filter((i) => i !== interest));
		} else if (selectedInterests.length < 5) {
			setSelectedInterests([...selectedInterests, interest]);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<Chip
				selected={selectedInterests.includes(item)}
				onPress={() => toggleInterest(item)}
				style={styles.chip}
				selectedColor='black'
			>
				<Text style={styles.chipText}>{item}</Text>
			</Chip>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Escolhe abaixo 5 itens de seu interesse</Text>
			<FlatList
				data={interests}
				renderItem={renderItem}
				keyExtractor={(item) => item}
				numColumns={3}
			/>
			{selectedInterests.length === 5 && (
				<Button
					title='Próximo'
					onPress={() => navigation.navigate('NextPage')}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	item: {
		flex: 1,
		margin: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chip: {
		margin: 3,
		backgroundColor: 'transparent',
		borderColor: 'black',
		borderWidth: 1,
	},
	chipText: {
		fontSize: 11,
	},
});
