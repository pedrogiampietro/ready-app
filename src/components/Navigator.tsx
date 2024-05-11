import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardWidePage } from '../views/OnboardWidePage';
import { OnboardExplorePage } from '../views/OnboardExplorePage';
import { OnboardPeoplePage } from '../views/OnboardPeoplePage';
import { LoginPage } from '../views/LoginPage';
import { RegisterPage } from '../views/RegisterPage';
import { HomePage } from '../views/HomePage';

export type RootStackParamList = {
	OnboardWidePage: undefined;
	OnboardExplorePage: undefined;
	OnboardPeoplePage: undefined;
	LoginPage: undefined;
	RegisterPage: undefined;
	HomePage: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName='OnboardWidePage'
			screenOptions={{
				headerShown: false,
			}}
		>
			<RootStack.Screen name='OnboardWidePage' component={OnboardWidePage} />
			<RootStack.Screen
				name='OnboardExplorePage'
				component={OnboardExplorePage}
			/>
			<RootStack.Screen
				name='OnboardPeoplePage'
				component={OnboardPeoplePage}
			/>
			<RootStack.Screen name='LoginPage' component={LoginPage} />
			<RootStack.Screen name='RegisterPage' component={RegisterPage} />
			<RootStack.Screen name='HomePage' component={HomePage} />
		</RootStack.Navigator>
	</NavigationContainer>
);
