import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardWidePage } from "../views/OnboardWidePage";
import { OnboardExplorePage } from "../views/OnboardExplorePage";
import { OnboardPeoplePage } from "../views/OnboardPeoplePage";
import { LoginScreen } from "../views/LoginScreen";

export type RootStackParamList = {
  OnboardWidePage: undefined;
  OnboardExplorePage: undefined;
  OnboardPeoplePage: undefined;
  LoginScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => (
  <NavigationContainer>
    <RootStack.Navigator
      initialRouteName="OnboardWidePage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="OnboardWidePage" component={OnboardWidePage} />
      <RootStack.Screen
        name="OnboardExplorePage"
        component={OnboardExplorePage}
      />
      <RootStack.Screen
        name="OnboardPeoplePage"
        component={OnboardPeoplePage}
      />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
