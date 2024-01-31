import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import axios from "axios";

const chatroom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const socket = io(`https://datingclone-backend.onrender.com:8000`);
  socket.on("connect", () => {
    console.log("Connected to the Socket.IO server");
    alert("Connected to the Socket.IO server");
  });
  socket.on("receiveMessage", (newMessage) => {
    console.log("new Message", newMessage);
    alert("new Message", newMessage);

    //update the state to include new message
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  });

  const sendMessage = async (senderId, receiverId) => {
    socket.emit("sendMessage", { senderId, receiverId, message });
    alert(senderId + ": " + receiverId + ": " + message);
    setMessage("");

    // call the fetchMessages() function to see the UI update
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="black" />
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{ uri: params?.image }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {params?.name}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
          <Ionicons name="videocam-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const fetchMessages = async () => {
    try {
      const senderId = params?.senderId;
      const receiverId = params?.receiverId;

      const response = await axios.get("https://datingclone-backend.onrender.com/messages", {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching the messages from backend", error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessages((prevSelectedMessages) => {
      if (prevSelectedMessages.includes(messageId)) {
        return prevSelectedMessages.filter((id) => id !== messageId);
      } else {
        return [...prevSelectedMessages, messageId];
      }
    });
  };

  const handleDeleteMessages = async () => {
    // Check if there are selected messages to delete
    if (selectedMessages.length === 0) {
      return; // No messages selected, do nothing
    }

    // Display confirmation alert
    Alert.alert(
      "Delete Messages",
      "Are you sure you want to delete the selected message(s)?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Send request to delete messages
              await axios.post("https://datingclone-backend.onrender.com/delete", {
                messages: selectedMessages,
              });
              // Remove deleted messages from the UI
              setMessages((prevMessages) =>
                prevMessages.filter(
                  (message) => !selectedMessages.includes(message._id)
                )
              );
              // Clear selected messages
              setSelectedMessages([]);
            } catch (error) {
              console.log("Error deleting messages:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {messages?.map((item, index) => (
          <Pressable
            key={index}
            onLongPress={() => handleSelectMessage(item._id)} // Trigger message selection on long press
            style={[
              item?.senderId === params?.senderId
                ? {
                    alignSelf: "flex-end",
                    backgroundColor: "#F08080",
                    padding: 8,
                    maxWidth: "60%",
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: "#DB7093",
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: "60%",
                  },
              selectedMessages.includes(item._id) && {
                borderWidth: 2,
                borderColor: "yellow",
              }, // Highlight selected messages
            ]}
          >
            <Text
              style={{
                fontSize: 13,
                textAlign: "left",
                color: "white",
                fontWeight: "500",
              }}
            >
              {item?.message}
            </Text>
            <Text
              style={{
                fontSize: 9,
                textAlign: "right",
                color: "#F0F0F0",
                marginTop: 5,
              }}
            >
              {formatTime(item?.timestamp)}
            </Text>
            {selectedMessages.includes(item._id) && ( // Display delete button for selected messages
              <Pressable onPress={() => handleDeleteMessages()}>
                <Ionicons name="trash-outline" size={20} color="white" />
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: 1,
        }}
      >
        <Entypo
          style={{ marginRight: 7 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 8,
          }}
        >
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => sendMessage(params?.senderId, params?.receiverId)}
          style={{
            backgroundColor: "#007bff",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chatroom;

const styles = StyleSheet.create({});
