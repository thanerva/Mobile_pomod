import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const TaskInput = (props) => {
  const [enteredTask, setEnteredTask] = useState("");
  const cancelTaskAdd = () => {
    props.onCancel();
    setEnteredTask("");
  };

  const addTaskHandler = () => {
    props.onAddTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <Modal
      transparent
      visible={props.mode}
      animationType="slide"
      backdropColor={"transparent"}
      //   style={{ margin: 0, backgroundColor: "rgba(0,0,0,.6)" }}
    >
      <View style={styles.inputContainer}>
        <View style={styles.modalfix}>
          <TextInput
            style={styles.input}
            placeholder="Add a task"
            onChangeText={(enteredTask) => setEnteredTask(enteredTask)}
            value={enteredTask}
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={cancelTaskAdd} />
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={addTaskHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  modalfix: {
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#ffb861",
    width: 300,
    height: 100,
  },
  input: {
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    width: "80%",
    borderRadius: 3,
    fontSize: 20,
    marginBottom: 10,
    height: 60,
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    borderRadius: 10,
  },
  button: {
    width: "40%",
  },
});
export default TaskInput;
