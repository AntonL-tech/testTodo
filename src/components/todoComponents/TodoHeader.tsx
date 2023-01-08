import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

type TodoHeader = {
  onAddTask: () => void;
};

const TodoHeader = (props: TodoHeader) => {
  const {onAddTask} = props;

  return (
    <View>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={onAddTask}>
          <Text style={styles.text}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: '80%',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default TodoHeader;
