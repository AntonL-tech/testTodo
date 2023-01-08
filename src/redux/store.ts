import {configureStore} from '@reduxjs/toolkit';
import reducerList from './reducerList';
const store = configureStore({
  reducer: {
    reducerList,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
