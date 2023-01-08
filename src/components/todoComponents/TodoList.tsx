import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Modal} from 'react-native';
import {TodoAddItemComponent, TodoHeader, TodoItem} from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('storedTodos');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setTodos(data ? data : todos);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const onEditItem = (item: any) => {
    setEditedItem(item);
    setIsModalVisible(true);
  };

  const renderItem = useCallback(({item}: any) => {
    return (
      <TodoItem
        setTodos={setTodos}
        onEditTask={() => onEditItem(item)}
        item={item}
      />
    );
  }, []);

  return (
    <View>
      <TodoHeader
        onAddTask={() => {
          setEditedItem(null);
          setIsModalVisible(true);
        }}
      />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TodoAddItemComponent
          setTodos={setTodos}
          editedItem={editedItem}
          onWindowClose={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default TodoList;
