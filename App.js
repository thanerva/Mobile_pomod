import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PomodoroScreen from "./screens/PomodoroScreen";
import TasksScreen from "./screens/TasksScreen";

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Pomodoro") {
      iconName = "md-alarm-outline";
    } else if (route.name === "Tasks") {
      iconName = "md-create-outline";
    }
    return <Ionicons name={iconName} size={40} color={color} />;
  },
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={{
          activeTintColor: "#ffb861",
          inactiveTintColor: "#b3b6cb",
          activeBackgroundColor: "#858dad",
          inactiveBackgroundColor: "#3d435c",
        }}
      >
        <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
