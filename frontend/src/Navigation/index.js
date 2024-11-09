// src/navigation/navigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Header from '../component/Header';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />, 
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
        />

        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
