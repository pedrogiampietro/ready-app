import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { OnboardWidePage } from '../views/OnboardWidePage';
import { OnboardExplorePage } from '../views/OnboardExplorePage';
import { OnboardPeoplePage } from '../views/OnboardPeoplePage';
import { LoginPage } from '../views/LoginPage';
import { RegisterPage } from '../views/RegisterPage';
import { HomePage } from '../views/HomePage';
import { TravelDetailPage } from '../views/TravelDetailPage';

export type RootStackParamList = {
	HomeTabs: undefined;
	OnboardWidePage: undefined;
	OnboardExplorePage: undefined;
	OnboardPeoplePage: undefined;
	LoginPage: undefined;
	RegisterPage: undefined;
	HomePage: undefined;
	TravelDetailPage: undefined;
	TravelCreationForm: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName='HomePage'
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: '#FF7029',
				tabBarStyle: {
					backgroundColor: '#FFFFFF',
					borderTopColor: 'transparent',
					borderRadius: 30,
					marginHorizontal: 10,
					marginBottom: 14,
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 64,
					// display:
					// 	route.name === 'TravelCreationForm' || route.name === 'ProfilePage'
					// 		? 'none'
					// 		: 'flex',
				},
			})}
		>
			<Tab.Screen
				name='HomePage'
				component={HomePage}
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'home' : 'home-outline'}
							color={color}
							size={size}
						/>
					),
					tabBarLabel: () => null,
				}}
			/>
		</Tab.Navigator>
	);
};

export const Navigator = () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName='HomeTabs'
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
			<RootStack.Screen name='HomeTabs' component={HomeTabs} />
			<RootStack.Screen name='HomePage' component={HomePage} />
			<RootStack.Screen name='TravelDetailPage' component={TravelDetailPage} />
		</RootStack.Navigator>
	</NavigationContainer>
);
