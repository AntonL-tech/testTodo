import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {TodoList} from '../components/todoComponents';

const TodoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
    </SafeAreaView>
  );
};
export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
