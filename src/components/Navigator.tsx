import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePage } from './HomePage';
import { InterestsPage } from './InterestsPage';

export type RootStackParamList = {
	Home: undefined;
	NerdSwipe: undefined;
	Interests: undefined;
	NerdMatch: MatchPageParams;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerShown: false,
			}}
		>
			<RootStack.Screen name='Home' component={HomePage} />
			<RootStack.Screen name='Interests' component={InterestsPage} />
		</RootStack.Navigator>
	</NavigationContainer>
);
