import React, { useState } from 'react';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import MessagesScreen from './app/screens/MessagesScreen';

import Screen from './app/components/Screen';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image } from 'react-native';
import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import NavigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { AppLoading } from 'expo';

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
