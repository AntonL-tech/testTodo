import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoAddItemComponent, TodoHeader, TodoItem} from './index';
import {getData, getStatus} from '../../utils/utils';
import {ITodo} from '../../redux/models/ITodo';

type Item = {
  item: ITodo;
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<ITodo | null>(null);

  useEffect(() => {
    getStatus(setIsModalVisible, setEditedItem);
    getData(todos, setTodos);
  }, []);

  const onEditItem = (item: ITodo | null) => {
    setEditedItem(item);
    onWindowOpen(item);
  };

  const onWindowOpen = (item: ITodo | null) => {
    setIsModalVisible(true);
    AsyncStorage.setItem('windowStatus', 'true');
    const jsonValue = JSON.stringify(item);
    AsyncStorage.setItem('editedItem', jsonValue);
  };

  const onWindowClose = () => {
    setIsModalVisible(false);
    AsyncStorage.setItem('windowStatus', 'false');
  };

  const renderItem = useCallback(({item}: Item) => {
    return (
      <TodoItem
        key={item?.id}
        setTodos={setTodos}
        onEditTask={() => onEditItem(item)}
        item={item}
      />
    );
  }, []);

  return (
    <>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <TodoHeader
            onAddTask={() => {
              setEditedItem(null);
              onWindowOpen(null);
            }}
          />
        )}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TodoAddItemComponent
          setTodos={setTodos}
          editedItem={editedItem}
          onWindowClose={onWindowClose}
        />
      </Modal>
    </>
  );
};

export default TodoList;
