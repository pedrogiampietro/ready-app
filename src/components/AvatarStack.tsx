import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const AvatarStack = () => {
	return (
		<View style={styles.container}>
			{[1, 2, 3].map((avatar: any, index: number) => (
				<Image
					key={index}
					source={{ uri: 'https://github.com/pedrogiampietro.png' }}
					style={[styles.avatar, { right: index * 20 }]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		position: 'relative',
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: 22,
		position: 'absolute',
	},
});
