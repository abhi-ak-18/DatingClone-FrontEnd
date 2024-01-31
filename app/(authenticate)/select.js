import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "expo-router";

const select = () => {
    const router = useRouter();
  const [option, setoption] = useState("");
  const [userId, setuserId] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setuserId(userId);
    };
    fetchUser();
  }, []);

  const updateUserGender = async () => {
    try{
      const response = await axios.put(`https://datingclone-backend.onrender.com/users/${userId}/gender`,{
          gender:option
      });

      console.log(response.data);

      if(response.status == 200){
          router.replace("(tabs)/bio")
      }
  } catch(error){
      console.log("error",error)
  }
}
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
      <Pressable
        onPress={() => setoption("male")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "male" ? "#D0D0D0" : "transparent",
          borderWidth: option == "male" ? 5 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>I am a Man</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.freepik.com/128/4440/4440953.png?ga=GA1.1.70480119.1646212155",
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setoption("female")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "female" ? "#D0D0D0" : "transparent",
          borderWidth: option == "female" ? 5 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>I am a Woman</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.freepik.com/128/949/949644.png?ga=GA1.1.70480119.1646212155&semt=ais",
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setoption("nonbinary")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "nonbinary" ? "#D0D0D0" : "transparent",
          borderWidth: option == "nonbinary" ? 5 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          I am a Non-Binary
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn.iconscout.com/icon/free/png-512/free-non-binary-3218549-2689181.png?f=webp&w=256",
          }}
        />
      </Pressable>
      {option && (
        <Pressable
          onPress={updateUserGender}
          style={{
            marginTop: 35,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default select;

const styles = StyleSheet.create({});
