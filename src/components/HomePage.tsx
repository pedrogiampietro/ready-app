import styled from '@emotion/native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimalIcon } from '../icons/AnimalIcon';
import { BeeIcon } from '../icons/BeeIcon';
import { BackgroundGradient } from './BackgroundGradient';
import { HomeButton } from './HomeButton';
import { type RootStackParamList } from './Navigator';
import { Page } from './Page';

export const HomePage = () => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<StyledPage>
			<StatusBar style='light' />
			<BackgroundGradient />
			<ButtonsContainer>
				<HomeButton
					title='Nerd example'
					subTitle='A classic Tinder-like swipe application.'
					Icon={AnimalIcon}
					onPress={() => {
						navigate('NerdSwipe');
					}}
				/>

				<HomeButton
					title='Interesse example'
					subTitle='A classic Tinder-like swipe application.'
					Icon={AnimalIcon}
					onPress={() => {
						navigate('Interests');
					}}
				/>
			</ButtonsContainer>
		</StyledPage>
	);
};

const StyledPage = styled(Page)({
	paddingHorizontal: 16,
});

const ButtonsContainer = styled(SafeAreaView)({
	paddingTop: 16,
	gap: 16,
});
