import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';

interface Task {
  id: number;
  title: string;
  description: string;
}

// interface AppState {
//   tasks: NewTask[];
// }
// const initialState: AppState = {
//   tasks: [],
// };
const reducerTodo = createSlice({
  name: 'reducerTodo',
  initialState: [],
  reducers: {
    addTask: (state: Task[], action: PayloadAction<Task>) => {
      const newTask: Task = {
        id: action?.payload?.id,
        title: action.payload.title,
        description: action.payload.description,
      };
      state.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<Task>): Task[] => {
      return state.filter(item => item.id !== action.payload.id);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const newState = state.map(item => {
        if (item?.id === action?.payload?.id) {
          return action?.payload;
        }
        return item;
      });
      console.log(11111, newState);

      return newState;
    },
  },
});

export const {addTask, deleteTask, editTask} = reducerTodo.actions;

export default reducerTodo.reducer;
