import React from 'react';
import { ScrollView, View } from 'react-native';
import tw from 'twrnc';
import LoginScreen from '../screens/LoginScreen'
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={tw`flex-grow bg-white `}>
      <View style={tw`flex-1 mt-4`}>
        <LoginScreen />
      </View>
    </ScrollView>
  );
}
