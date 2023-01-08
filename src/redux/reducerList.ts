import {createSlice} from '@reduxjs/toolkit';
import {IPersons} from '../redux/models/IPersons';
import {getList} from './asyncReducers/asyncReducers';
interface AppState {
  error: unknown;
  persons: IPersons[];
}
const initialState: AppState = {
  error: false,
  persons: [],
};
const reducerList = createSlice({
  name: 'reducerList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getList.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getList.fulfilled, (state, action) => {
      state.persons = [...state.persons, ...action.payload];
    });
  },
});
export default reducerList.reducer;
