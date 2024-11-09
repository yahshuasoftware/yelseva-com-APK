import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from "react-native";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import loginUp from "../../assets/loginup.jpg";

const Signup = () => {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();



  const handleSignup = () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Signup successful! Please login.",
    });

    setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 items-center justify-center bg-white`}>
          <Image source={loginUp} style={tw`h-28 w-11/12`} resizeMode="cover" />
      <View style={tw`w-11/12 bg-white rounded-lg shadow-lg p-8`}>
        <Text style={tw`text-xl font-semibold text-center mb-6`}>Signup</Text>

        <TextInput
          placeholder="Enter your name"
          style={tw`w-full h-12 px-4 mb-4 text-md border border-gray-300 rounded-md`}
          value={name}
          onChangeText={(text) => setName(text.toLowerCase())}
        />
        <TextInput
          placeholder="Enter your email"
          style={tw`w-full h-12 px-4 mb-4 text-md border border-gray-300 rounded-md`}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter your phone number"
          style={tw`w-full h-12 px-4 mb-4 text-md border border-gray-300 rounded-md`}
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={tw`w-full h-12 px-4 mb-4 text-md border border-gray-300 rounded-md`}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry
          style={tw`w-full h-12 px-4 mb-4 text-md border border-gray-300 rounded-md`}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          onPress={handleSignup}
          style={tw`w-full h-12 bg-[#075985] justify-center items-center rounded-md mt-6`}
        >
          <Text style={tw`text-white text-md font-medium`}>Signup</Text>
        </TouchableOpacity>

        <View style={tw`text-center mt-6`}>
          <Text>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={tw`text-[#6279B8] underline`}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>

      {/* Toast Container */}
      <Toast />
    </ScrollView>
  );
};

export default Signup;
