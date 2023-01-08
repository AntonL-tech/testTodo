import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {priorityValue, statusValue} from '../../utils/const';
import {addTask, editTask} from '../../utils/utils';

type TodoInput = {
  onWindowClose: () => void;
  editedItem: any;
  setTodos: any;
};

const TodoAddItemComponent = (props: TodoInput) => {
  const {onWindowClose, editedItem, setTodos} = props;

  const [title, setTitle] = useState(editedItem?.title || '');
  const [description, setDescription] = useState(editedItem?.description);
  const [priority, setPriority] = useState(editedItem?.priority);
  const [status, setStatus] = useState(editedItem?.status);

  const [openPriority, setOpenPriority] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const addItem = () => {
    if (title.trim().length === 0) {
      Alert.alert('You need to enter a title');
    } else if (editedItem) {
      setTodos(prevState => {
        return addTask(prevState, editedItem, {
          title,
          description,
          priority,
          status,
        });
      });
      onWindowClose();
    } else {
      setTodos(prevState => {
        return editTask(prevState, {
          title,
          description,
          priority,
          status,
        });
      });
      onWindowClose();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter title"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter description"
        maxLength={100}
      />
      <DropDownPicker
        open={openPriority}
        value={priority}
        items={priorityValue}
        setOpen={setOpenPriority}
        setValue={setPriority}
        style={styles.picker}
        placeholder="Select priority"
      />
      <DropDownPicker
        open={openStatus}
        value={status}
        items={statusValue}
        setOpen={setOpenStatus}
        setValue={setStatus}
        style={styles.picker}
        zIndex={1}
        placeholder="Select status"
      />
      <TouchableHighlight onPress={addItem} style={styles.button}>
        <Text>Add</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    width: '95%',
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'rgb(153, 153, 255)',
    width: '60%',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default TodoAddItemComponent;
