import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {deleteTask, editTask} from '../../redux/reducerTodo';
import {useAppDispatch} from '../../redux/hooks/redux';

export default function TodoItem(props: any) {
  const {item, onEditTask} = props;
  const dispatch = useAppDispatch();

  const onDeleteItem = (id: number) => {
    dispatch(
      deleteTask({
        id: id,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainers}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.status}>
          <Text>Status:{item.status}</Text>
          <Text>Priority:{item.priority}</Text>
        </View>
      </View>
      <View style={styles.subcontainers}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDeleteItem(item?.id)}>
          <EvilIcons name="trash" color="red" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onEditTask}>
          <AntDesign name="edit" color="black" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    marginTop: 15,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'space-between',
    minHeight: 100,
  },
  status: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'black',
    maxWidth: '80%',
  },
  subcontainers: {
    justifyContent: 'space-between',
    padding: 5,
  },
  description: {
    marginTop: 10,
    maxWidth: '80%',
  },
  button: {
    width: '80%',
    margin: 10,
  },
});
