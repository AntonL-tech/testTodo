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
import {useAppDispatch} from '../../redux/hooks/redux';
import {addTask, editTask} from '../../redux/reducerTodo';

type TodoInput = {
  onWindowClose: () => void;
  editedItem: any;
};

const TodoAddItemComponent = (props: TodoInput) => {
  const {onWindowClose, editedItem} = props;
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(editedItem?.title);
  const [description, setDescription] = useState(editedItem?.description);
  const [priority, setPriority] = useState(editedItem?.priority);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'High', value: 'high'},
    {label: 'Medium', value: 'medium'},
    {label: 'Low', value: 'low'},
  ]);

  const addItem = () => {
    if (title.trim().length === 0) {
      Alert.alert('You need to enter a title');
      setTitle('');
    } else if (editedItem) {
      dispatch(
        editTask({
          id: editedItem?.id,
          title,
          description,
        }),
      );
      onWindowClose();
    } else {
      dispatch(
        addTask({
          id: Math.random(),
          title,
          description,
        }),
      );
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
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter description"
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TouchableHighlight onPress={addItem}>
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
  },
});

export default TodoAddItemComponent;
