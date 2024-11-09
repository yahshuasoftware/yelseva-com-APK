import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/AuthContext";
import { SignIn } from "../apiIntegration/Login";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import loginUp from "../../assets/loginup.jpg";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Pune");

  const handleLogin = async () => {
    try {
      const data = await SignIn(email, password, state, district);
      if (data.jwt_token) {
        login(data.jwt_token);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });
        setEmail("");
        setPassword("");
        setState("Maharashtra");
        setDistrict("Pune");
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
      });
    }
  };

  const districts = [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", 
    "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur",
    "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik",
    "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
    "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", 
    "Ladakh", "Jammu and Kashmir"
  ];

  return (
    <View style={tw`flex-1 items-center bg-white`}>
      <Image source={loginUp} style={tw`h-28 w-11/12`} resizeMode="cover" />
      <View style={tw`w-11/12 bg-white rounded-lg shadow-lg p-5`}>
        <Text style={tw`text-lg font-bold text-center mb-3`}>Login into YEL</Text>

        <View style={tw`flex-row justify-center gap-2 mb-3`}>
          <TouchableOpacity
            style={tw`px-4 py-2 rounded-md ${!loginWithOtp ? "bg-[#075985] text-white" : "bg-gray-300"}`}
            onPress={() => setLoginWithOtp(false)}
          >
            <Text style={tw`text-white text-sm`}>Email Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-4 py-2 rounded-md ${loginWithOtp ? "bg-[#075985] text-black" : "bg-gray-300"}`}
            onPress={() => setLoginWithOtp(true)}
          >
            <Text style={tw`text-white text-sm`}>Phone Login</Text>
          </TouchableOpacity>
        </View>

        {!loginWithOtp ? (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`}
            />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Phone number"
              style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`}
            />
            <TextInput
              placeholder="OTP"
              style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`}
            />
          </>
        )}

        <View style={tw`border border-gray-300 rounded-md mb-2`}>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            style={tw`w-full`}
          >
            {states.map((stateItem) => (
              <Picker.Item key={stateItem} label={stateItem} value={stateItem} />
            ))}
          </Picker>
        </View>

        <View style={tw`border border-gray-300 rounded-md mb-4`}>
          <Picker
            selectedValue={district}
            onValueChange={(itemValue) => setDistrict(itemValue)}
            style={tw`w-full`}
          >
            {districts.map((districtItem) => (
              <Picker.Item key={districtItem} label={districtItem} value={districtItem} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={tw`bg-[#075985] p-3 rounded-md`} onPress={handleLogin}>
          <Text style={tw`text-center text-white text-sm`}>
            {loginWithOtp ? "Verify OTP" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={tw`text-center text-blue-500 text-sm mt-4`}>
            Don't have an account? <Text style={tw`underline`}>Sign up here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
