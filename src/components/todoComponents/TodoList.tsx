import React, {useState, useCallback} from 'react';
import {View, FlatList, Modal} from 'react-native';
import {useAppSelector} from '../../redux/hooks/redux';
import {TodoAddItemComponent, TodoHeader, TodoItem} from './index';

const TodoList = () => {
  const todos = useAppSelector(state => state.reducerTodo);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const onEditItem = (item: any) => {
    setEditedItem(item);
    setIsModalVisible(true);
  };

  const renderItem = useCallback(({item}: any) => {
    return <TodoItem onEditTask={() => onEditItem(item)} item={item} />;
  }, []);

  return (
    <View>
      <TodoHeader onAddTask={() => setIsModalVisible(true)} />
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
          editedItem={editedItem}
          onWindowClose={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default TodoList;
