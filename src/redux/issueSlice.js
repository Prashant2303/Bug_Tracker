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
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${base_url}/issues/${id}`)
      return id;
    }
    catch (error) {
      console.log(error);
      return rejectWithValue(null)
    }
  }
)

export const updateViewCountThunk = createAsyncThunk(
  'updateViewCount',
  async (issue) => {
    try {
      let newIssue = { ...issue };
      newIssue.viewed = issue.viewed + 1;
      await axios.put(`${base_url}/issues/${issue.id}`, newIssue);
    }
    catch (error) {
      console.log(error);
    }
  }
)

export const updateIssueThunk = createAsyncThunk(
  'updateIssue',
  async (issue) => {
    try {
      const response = await axios.put(`${base_url}/issues/${issue.id}`, issue);
      return response;
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
      if (action !== null) {
        state.list = state.list.filter( issue => issue.id !== action.payload);
      }
    },

  }
})

export default counterSlice.reducer