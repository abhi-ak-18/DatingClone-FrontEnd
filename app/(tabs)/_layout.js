import { Tabs } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return(
  <Tabs>
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profiles",
        tabBarLabelStyle: {
            fontSize: 12, // Adjust the font size as needed
            fontWeight:"bold"
          },
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="eye" size={24} color="black" />
          ) : (
            <Feather name="eye" size={24} color="gray" />
          ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chats",
        tabBarLabelStyle: {
            fontSize: 12, // Adjust the font size as needed
            fontWeight:"bold"
          },
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="gray"
            />
          ),
      }}
    />
    <Tabs.Screen
      name="bio"
      options={{
        title: "Account",
        tabBarLabelStyle: {
            fontSize: 12, // Adjust the font size as needed
            fontWeight:"bold"
          },
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons
              name="guy-fawkes-mask"
              size={24}
              color="black"
            />
          ) : (
            <MaterialCommunityIcons
              name="guy-fawkes-mask"
              size={24}
              color="gray"
            />
          ),
      }}
    />
  </Tabs>
    );
}
