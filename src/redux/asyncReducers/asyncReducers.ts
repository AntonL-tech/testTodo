import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {transformPerson} from '../../utils/utils';

const apiBase: string = 'https://swapi.dev/api';

export const getList = createAsyncThunk(
  'reducerList/getList',
  async (page: number) => {
    try {
      const res = await axios.get(`${apiBase}/people/?page=${page}`);

      if (res.status !== 200) {
        throw new Error(`Could not fetch ${apiBase}/people/?page=${page}`);
      }

      return res.data.results.map(transformPerson);
    } catch (err: any) {
      throw new Error(err);
    }
  },
);
