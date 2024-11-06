import React from 'react';
import { Text, View, Button } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Text style={tw`text-lg font-bold mb-10`}>Welcome to the Home Screen!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={tw`mt-2`}>
        <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );
}
