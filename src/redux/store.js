import { configureStore } from '@reduxjs/toolkit'
import issueReducer from './issueSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    handler : issueReducer,
    user : userReducer
  },
})