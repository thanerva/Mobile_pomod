import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, Alert } from "react-native";
import Pomodoro from "../components/Pomodoro";

export default function PomodoroScreen() {
  return (
    <View style={styles.container}>
      <Pomodoro />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e212d",
    //  alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    height: "30%",
  },
});
