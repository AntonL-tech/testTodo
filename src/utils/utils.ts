import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPerson} from '../redux/models/IPerson';
import {Alert} from 'react-native';
import {Dispatch} from 'react';
import {ITodo} from '../redux/models/ITodo';

function extractId(item: IPerson) {
  const idRegExp = /\/([0-9]*)\/$/;
  return item.url.match(idRegExp)[1];
}

export const transformPerson = (person: IPerson): PersonProps => {
  return {
    id: extractId(person),
    name: person.name,
  };
};

export const editTask = (
  prevState: ITodo[],
  editedItem: ITodo,
  newItem: ITodo,
): ITodo[] => {
  const newState = prevState.map(item => {
    if (item?.id === editedItem?.id) {
      return {
        id: editedItem?.id,
        title: newItem?.title,
        description: newItem?.description,
        priority: newItem?.priority,
        status: newItem?.status,
      };
    }

    return item;
  });

  const jsonValue = JSON.stringify(newState);
  AsyncStorage.setItem('storedTodos', jsonValue);

  return newState;
};

export const addTask = (prevState: ITodo[], newItem: ITodo): ITodo[] => {
  const newState: ITodo[] = [
    ...prevState,
    {
      id: newItem?.id,
      title: newItem?.title,
      description: newItem?.description,
      priority: newItem?.priority,
      status: newItem?.status,
    },
  ];
  const jsonValue = JSON.stringify(newState);
  AsyncStorage.setItem('storedTodos', jsonValue);
  return newState;
};

export const deleteTask = (prevState: ITodo[], id: string): ITodo[] => {
  const newState = prevState.filter(item => item.id !== id);
  const jsonValue = JSON.stringify(newState);
  AsyncStorage.setItem('storedTodos', jsonValue);
  return newState;
};

export const getData = async (todos: ITodo[], setTodos: Dispatch<any>) => {
  try {
    const jsonValue = await AsyncStorage.getItem('storedTodos');
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    setTodos(data ? data : todos);
  } catch (e) {
    // error reading value
  }
};

export const getStatus = async (
  setIsModalVisible: Dispatch<boolean>,
  setEditedItem: Dispatch<ITodo | null>,
) => {
  try {
    const value = await AsyncStorage.getItem('windowStatus');
    const jsonValue = await AsyncStorage.getItem('editedItem');
    const editedItem = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (value !== null && value !== 'false') {
      Alert.alert('', 'Хотите продолжить?', [
        {
          text: 'да',
          onPress: () => {
            if (editedItem) {
              setEditedItem(editedItem);
            }
            setIsModalVisible(true);
          },
        },
        {text: 'нет', onPress: () => setIsModalVisible(false)},
      ]);
    }
  } catch (e) {
    // error reading value
  }
};
