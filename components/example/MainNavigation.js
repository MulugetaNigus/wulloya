import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Import your screen components
import Main from "./Main";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the stack navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Page" component={Main} />
      <Stack.Screen name="Screen One Page" component={Screen1} />
      <Stack.Screen name="Screen Two Page" component={Screen2} />
    </Stack.Navigator>
  );
}

// Define the bottom tab navigator
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home Page"
        component={Main}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? "tomato" : "grey"}
              size={focused ? 30 : 23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen One Page"
        component={Screen1}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="facebook"
              color={focused ? "tomato" : "grey"}
              size={focused ? 30 : 23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen Two Page"
        component={Screen2}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="youtube"
              color={focused ? "tomato" : "grey"}
              size={focused ? 30 : 23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen Two Pagee"
        component={Screen2}
        options={{
            tabBarBadge: 12,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="cart"
              color={focused ? "tomato" : "grey"}
              size={focused ? 30 : 23}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigators() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
