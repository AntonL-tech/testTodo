import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPerson} from '../redux/models/IPerson';

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

export const addTask = (prevState, editedItem, newItem) => {
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

export const editTask = (prevState, newItem) => {
  const newState = [
    ...prevState,
    {
      id: Math.random(),
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

export const deleteTask = (prevState, id) => {
  const newState = prevState.filter(item => item.id !== id);
  const jsonValue = JSON.stringify(newState);
  AsyncStorage.setItem('storedTodos', jsonValue);
  return newState;
};
