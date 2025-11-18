import { NavigatorScreenParams } from '@react-navigation/native';

import { CityEvent } from '../types';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  EventDetails: {
    event: CityEvent;
  };
  AddEvent: undefined;
};

