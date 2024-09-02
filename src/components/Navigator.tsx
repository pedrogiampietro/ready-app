import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { OnboardWidePage } from "../views/OnboardWidePage";
import { OnboardExplorePage } from "../views/OnboardExplorePage";
import { OnboardPeoplePage } from "../views/OnboardPeoplePage";
import { LoginPage } from "../views/LoginPage";
import { RegisterPage } from "../views/RegisterPage";
import { HomePage } from "../views/HomePage";
import { TravelDetailPage } from "../views/TravelDetailPage";
import { CalendarPage } from "../views/CalendarPage";
import { ViewTravelPage } from "../views/ViewTravelPages";
import { GenerateTravelWithIAPage } from "../views/GenerateTravelWithIAPage";
import { useAuth } from "../hooks/useAuth";
import { ProfilePage } from "../views/ProfilePage";
import { PlansPage } from "../views/PlansPage";
import { ForgotPasswordScreen } from "../views/ForgotPasswordPages/ForgotPasswordScreen";
import { EnterCodeScreen } from "../views/ForgotPasswordPages/EnterCodeScreen";
import { NewPasswordScreen } from "../views/ForgotPasswordPages/NewPasswordScreen";

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
  ViewTravelPage: undefined;
  ProfilePage: undefined;
  PlansPage: undefined;
  ForgotPasswordScreen: undefined;
  EnterCodeScreen: undefined;
  NewPasswordScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF7029",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "transparent",
          borderRadius: 30,
          marginHorizontal: 10,
          marginBottom: 14,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          display: route.name === "GenerateTravelWithIAPage" ? "none" : "flex",
        },
      })}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="CalendarPage"
        component={CalendarPage}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="GenerateTravelWithIAPage"
        component={GenerateTravelWithIAPage}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "sparkles" : "sparkles-outline"}
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

export const Navigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isLoggedIn ? "HomeTabs" : "OnboardWidePage"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <RootStack.Screen name="HomeTabs" component={HomeTabs} />
            <RootStack.Screen name="HomePage" component={HomePage} />
            <RootStack.Screen
              name="TravelDetailPage"
              component={TravelDetailPage}
            />
            <RootStack.Screen
              name="ViewTravelPage"
              component={ViewTravelPage}
            />
            <RootStack.Screen name="ProfilePage" component={ProfilePage} />
            <RootStack.Screen name="PlansPage" component={PlansPage} />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="OnboardWidePage"
              component={OnboardWidePage}
            />
            <RootStack.Screen
              name="OnboardExplorePage"
              component={OnboardExplorePage}
            />
            <RootStack.Screen
              name="OnboardPeoplePage"
              component={OnboardPeoplePage}
            />
            <RootStack.Screen name="LoginPage" component={LoginPage} />
            <RootStack.Screen name="RegisterPage" component={RegisterPage} />
            <RootStack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <RootStack.Screen
              name="EnterCodeScreen"
              component={EnterCodeScreen}
            />
            <RootStack.Screen
              name="NewPasswordScreen"
              component={NewPasswordScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
