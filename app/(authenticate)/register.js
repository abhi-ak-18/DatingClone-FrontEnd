import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const user = {
        name,
        email,
        password,
      };
      const response = await axios.post("https://datingclone-backend.onrender.com/register", user);
  
      //console.log(response.data);
  
      if (response.status === 200) {
        Alert.alert(
          "Registration Successful",
          "Check your email to verify your account"
        );
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // Handle other status codes
        Alert.alert("Registration Failed", response.data.error);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status
        console.log("Server responded with an error:", error.response.data);
        Alert.alert("Registration Failed", error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from the server");
        Alert.alert("Registration Failed", "No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", error.message);
        Alert.alert(
          "Registration Failed",
          "An error occurred during registration"
        );
      }
    }
  };
  
  
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ height: 150, backgroundColor: "pink", width: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6655/6655045.png",
            }}
            style={{ width: 150, height: 60, resizeMode: "contain" }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Match Mate
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 25,
              color: "#F9629F",
            }}
          >
            Register for your Account
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 80, height: 61, resizeMode: "cover" }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2509/2509078.png",
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFC0CB",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              name="person-sharp"
              size={24}
              color="white"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Enter your name"
              placeholderTextColor={"white"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFC0CB",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="white"
            />
            <TextInput
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#FFC0CB",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                name="lock"
                size={24}
                color="white"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                style={{
                  color: "white",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                placeholder="Enter your password"
                placeholderTextColor={"white"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={{ marginTop: 40 }} />
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#87A96B",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <Pressable
            style={{ marginTop: 12 }}
            onPress={() => router.replace("/login")}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
