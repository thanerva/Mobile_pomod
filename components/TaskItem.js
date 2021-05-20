import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "../config/firebase";

const TaskItem = ({ taskList }) => {
  console.log(taskList);

  const deleteTask = () => {
    const taskRef = firebase.database().ref("tasks").child(taskList.item.id);
    taskRef.remove();
  };

  const updateTask = () => {
    const taskRef = firebase.database().ref("tasks").child(taskList.item.id);
    taskRef.update({
      completed: !taskList.item.completed,
    });
  };
  return (
    <Pressable onPress={updateTask} onLongPress={deleteTask}>
      <View
        style={taskList.item.completed ? styles.completed : styles.listItem}
      >
        <Text style={styles.text}>{taskList.item.title}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: "#ffb861",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 3,
  },
  text: {
    fontSize: 15,
  },
  completed: {
    padding: 10,
    backgroundColor: "#18B423",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 3,
  },
});
export default TaskItem;
