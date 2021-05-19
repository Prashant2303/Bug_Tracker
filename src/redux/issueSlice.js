import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'handler',
  initialState: {
    list: [],
  },
  reducers: {
    load: (state, action) => {
      state.list = action.payload;
    },
    add : (state, action) => {
      state.list.push(action.payload);
      console.log(JSON.stringify(state.list));
      // increment: (state) => {
      //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
      //   // doesn't actually mutate the state because it uses the Immer library,
      //   // which detects changes to a "draft state" and produces a brand new
      //   // immutable state based off those changes
      //   state.value += 1
      // },
    },
    del : (state, action) => {
      let index;
      // console.log(action.payload);
      for(let i=0;i<state.list.length;i++)
      {
        // console.log(JSON.stringify(state.list[i]));
        if(state.list[i].id === action.payload)
        { 
          index = i;
          // console.log(JSON.stringify(i+" "+state.list[i]));
          break;
        }
      }
      let deletedIssue = state.list.splice(index,1);
      // console.log(JSON.stringify(index+" "+deletedIssue));
    }
  },
})
// Action creators are generated for each case reducer function
export const { load, add, del } = counterSlice.actions

export default counterSlice.reducer