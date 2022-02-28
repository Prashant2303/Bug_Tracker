import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import base_url from '../service/api'

export const signupThunk = createAsyncThunk(
  'signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/users/signup`, formData)
      return response.data;
    }
    catch (error) {
      return rejectWithValue()  //To handle api errors, return rejectWithValue and use unwrap on dispatch to access this reject
    }
  }
)

export const signinThunk = createAsyncThunk(
  'signin',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/users/signin`, formData);
      return response.data;
    }
    catch (error) {
      return rejectWithValue()  //To handle api errors, return rejectWithValue and use unwrap on dispatch to access this reject
    }
  }
)

export const getUsersThunk = createAsyncThunk(
  'getUsers',
  async () => {
    try {
      const response = await axios.get(`${base_url}/users`);
      console.log('FROM THUNK ', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    loginStatus: false,
    authData: null
  },
  reducers: {
    loadUsers: (state, action) => {
      console.log('In loadUsers ', action.payload);
      state.list = action.payload;
    },

    add: (state, action) => {
      // console.log("In reducer"+ JSON.stringify(action.payload));
      console.log("Initial state ", state);
      state.list.push(action.payload);
      console.log("Final state", state);

      // increment: (state) => {
      //   Redux Toolkit allows us to write "mutating" logic in reducers. It
      //   doesn't actually mutate the state because it uses the Immer library,
      //   which detects changes to a "draft state" and produces a brand new
      //   immutable state based off those changes
      //   state.value += 1
      //},
    },
    login: (state, action) => {
      localStorage.setItem('user',JSON.stringify(action.payload));
      state.loginStatus = true;
      state.authData = {
        ...action.payload.profile,
        token: action.payload.token
      };
    },
    logout: (state, action) => {
      localStorage.removeItem('user');
      state.loginStatus = false;
      state.authData = null;
    }
  },
  extraReducers: {
    [getUsersThunk.fulfilled]: (state, action) => {
      console.log('IN EXTRA REDUCERS ' + action.payload);
      state.list = action.payload;
    },
    [signupThunk.fulfilled]: (state, action) => {
      localStorage.setItem('user',JSON.stringify(action.payload));
      state.loginStatus = true;
      state.authData = {
        ...action.payload.profile,
        token: action.payload.token
      };
    },
    [signinThunk.fulfilled]: (state, action) => {
      localStorage.setItem('user',JSON.stringify(action.payload));
      state.loginStatus = true;
      state.authData = {
        ...action.payload.profile,
        token: action.payload.token
      };
    },
  }
})
// Action creators are generated for each case reducer function
export const { loadUsers, add, login, logout } = userSlice.actions

export default userSlice.reducer