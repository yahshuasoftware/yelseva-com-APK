import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Navigation />
      <Toast />
    </AuthProvider>
  );
}
