import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Import your screen components
import Register from "../Register/Register";
import Login from "../LogIn/Login";
import PasswordReset from "../ForgetPasswordPage/PassswordReset";
import Main from "../MainPage/WulloyeMain";
import Post from "../PostPage/Post";
import Favorite from "../FavoritePage/Favorite";
import ContactDevelopers from "../DeveloperPage/Developer";
import Detail from "../PostDetailPage/Detail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the stack navigator for authentication and main content
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="forSomethingNeed" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Forget Password" component={PasswordReset} />
      <Stack.Screen name="HomePage" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="readMore" component={Detail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Define the bottom tab navigator
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          header: () => null,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" color={focused ? "tomato" : "grey"} size={focused ? 25 : 22} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          header: () => null,
          tabBarLabel: "Add Post",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="share-outline" color={focused ? "tomato" : "grey"} size={focused ? 25 : 22} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          header: () => null,
          tabBarLabel: "My Favorite",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="heart-circle-outline" color={focused ? "tomato" : "grey"} size={focused ? 25 : 26} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactDevelopers"
        component={ContactDevelopers}
        options={{
          header: () => null,
          tabBarLabel: "Contact Dev's",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="link" color={focused ? "tomato" : "grey"} size={focused ? 28 : 28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Combine both navigators into the main app container
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
