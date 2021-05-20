import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import TaskInput from "../components/TaskInput";
import TaskItem from "../components/TaskItem";
import firebase from "../config/firebase";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TasksScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskList, setTaskList] = useState();

  useEffect(() => {
    const taskRef = firebase.database().ref("tasks/");
    taskRef.on("value", (snapshot) => {
      const tasks = snapshot.val();
      const taskList = [];
      for (let id in tasks) {
        taskList.push({ id, ...tasks[id] });
      }
      setTaskList(taskList);
    });
  }, []);

  const addTaskHandler = (enteredTask) => {
    if (enteredTask.length === 0) {
      Alert.alert("No empty fields");
      return;
    }
    firebase.database().ref("tasks/").push({
      title: enteredTask,
      completed: false,
    });

    setModalOpen(false);
  };

  const cancelTaskAdd = () => {
    setModalOpen(false);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Tasks to complete</Text>
      </View>
      <StatusBar style="auto" />
      <FontAwesome5.Button
        style={styles.button}
        title="Add new task"
        name="plus-circle"
        size={35}
        color="#ffb861"
        onPress={() => setModalOpen(true)}
      />
      <TaskInput
        onAddTask={addTaskHandler}
        mode={modalOpen}
        onCancel={cancelTaskAdd}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={taskList}
          renderItem={(taskList) => <TaskItem taskList={taskList} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e212d",
    justifyContent: "center",
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    height: "40%",
  },
  text: {
    color: "#eabf9f",
    fontFamily: "monospace",
    fontSize: 30,
    fontWeight: "bold",
    padding: 60,
    marginLeft: 65,
  },
  button: {
    backgroundColor: "#1e212d",
  },
});
