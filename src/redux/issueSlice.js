import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import base_url from '../service/api'

export const getIssuesThunk = createAsyncThunk(
  'getIssues',
  async () => {
    try {
      const response = await axios.get(`${base_url}/issues`);
      const responseObject = {
        response: response.data,
        isLoading: false
      }
      // console.log('FROM THUNK ', response.data);
      return responseObject;
    } catch (error) {
      console.error(error);
      return {
        response: [],
        isLoading: false
      }
    }
  }
)

export const addIssueThunk = createAsyncThunk(
  'addIssue',
  async (issue) => {
    try {
      const response = await axios.post(`${base_url}/issues`, issue)
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }
)

export const delIssueThunk = createAsyncThunk(
  'delIssue',
  async (id) => {
    try {
      await axios.delete(`${base_url}/issues/${id}`)
      return id;
    }
    catch (error) {
      console.log(error);
    }
  }
)

export const counterSlice = createSlice({
  name: 'handler',
  initialState: {
    list: [],
    isLoading: true
  },
  reducers: {
    // load: (state, action) => {
    //   state.list = action.payload;
    // },
    // add : (state, action) => {
    //   state.list.push(action.payload);
    //   console.log(JSON.stringify(state.list));
    //   // increment: (state) => {
    //   //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   //   // doesn't actually mutate the state because it uses the Immer library,
    //   //   // which detects changes to a "draft state" and produces a brand new
    //   //   // immutable state based off those changes
    //   //   state.value += 1
    //   // },
    // },
    // del: (state, action) => {
    //   let index;
    //   // console.log(action.payload);
    //   for (let i = 0; i < state.list.length; i++) {
    //     // console.log(JSON.stringify(state.list[i]));
    //     if (state.list[i].id === action.payload) {
    //       index = i;
    //       // console.log(JSON.stringify(i+" "+state.list[i]));
    //       break;
    //     }
    //   }
    //   let deletedIssue = state.list.splice(index, 1);
    //   // console.log(JSON.stringify(index+" "+deletedIssue));
    // }
  },
  extraReducers: {
    [getIssuesThunk.fulfilled]: (state, action) => {
      state.list = action.payload.response;
      state.isLoading = action.payload.isLoading;
    },
    [addIssueThunk.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [delIssueThunk.fulfilled]: (state, action) => {
      let index;
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          index = i;
          break;
        }
      }
      state.list.splice(index, 1);
    },

  }
})
// Action creators are generated for each case reducer function
export const { load, add, del } = counterSlice.actions

export default counterSlice.reducer