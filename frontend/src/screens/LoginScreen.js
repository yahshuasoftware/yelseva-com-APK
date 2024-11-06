import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function LoginScreen() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Text style={tw`text-lg font-bold`}>Login Screen</Text>
    </View>
  );
}
