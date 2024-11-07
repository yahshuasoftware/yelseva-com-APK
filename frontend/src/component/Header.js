import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import tw from 'twrnc'; 

const Header = () => {
  return (
    <View style={tw`flex-row justify-between items-center p-1.5 bg-white shadow-md`}>
      <Image
        source={require('../../assets/yelLogo.png')} 
        style={tw`h-20 w-35 mt-3`} 
        resizeMode="contain"
      />
      
      <TouchableOpacity>
        <Ionicons name="menu" size={34} color="#075985" style={tw`mr-4 mt-6`} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
