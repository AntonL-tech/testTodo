import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {deleteTask} from '../../utils/utils';

export default function TodoItem(props: any) {
  const {item, onEditTask, setTodos} = props;
  //   const [color, setColor] = useState('#e9e9e9');

  const onDeleteItem = (id: number) => {
    setTodos(prevState => {
      return deleteTask(prevState, id);
    });
  };
  //   const renderColor = () => {
  //     if (item.priority === 'High') {
  //       return setColor('red');
  //     } else if (item.priority === 'Medium') {
  //       return setColor('blue');
  //     } else if (item.priority === 'Low') {
  //       return setColor('green');
  //     } else {
  //       return color;
  //     }
  //   };
  //   renderColor();

  return (
    <View style={styles.container}>
      <View style={styles.subcontainers}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.status_container}>
          <Text style={styles.status}>Status:{item.status}</Text>
          <Text style={styles.priority}>Priority:{item.priority}</Text>
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
  status_container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  priority: {
    marginLeft: 10,
    fontWeight: '500',
    color: 'red',
  },
  status: {
    fontWeight: '500',
    color: 'blue',
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
