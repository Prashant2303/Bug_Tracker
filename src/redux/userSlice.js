import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    list:[],
    loginStatus:false
  },
  reducers: {
    loadUsers: (state, action) => {
      console.log('In loadUsers '+JSON.stringify(action.payload));
      state.list = action.payload;
    },

    add : (state, action) => {
      // console.log("In reducer"+ JSON.stringify(action.payload));
      console.log("Initial state"+ JSON.stringify(state));
      state.list.push(action.payload);
      console.log("Final state"+ JSON.stringify(state));
      
      // increment: (state) => {
      //   Redux Toolkit allows us to write "mutating" logic in reducers. It
      //   doesn't actually mutate the state because it uses the Immer library,
      //   which detects changes to a "draft state" and produces a brand new
      //   immutable state based off those changes
      //   state.value += 1
      //},
    },
    login : (state, action) => {
      state.loginStatus = action.payload;
      console.log(state.loginStatus);
    }
  },
})
// Action creators are generated for each case reducer function
export const { loadUsers, add, login } = userSlice.actions

export default userSlice.reducer