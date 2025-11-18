import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

import SignInScreen from '../screens/Auth/SignIn/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUp/SignUpScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetails/EventDetailsScreen';
import AddEventScreen from '../screens/AddEvent/AddEventScreen';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import {
  AuthStackParamList,
  MainTabParamList,
  RootStackParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f8fafc',
  },
};

const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const MainTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'Dashboard' ? 'map' : 'user';
          return <Feather name={icon} color={color} size={size} />;
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t('common.dashboard') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('common.profile') }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => (
  <NavigationContainer theme={navTheme}>
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ presentation: 'modal', headerShown: true }}
      />
      <RootStack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Add Event' }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;

