import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseReducer from '../features/courses/courseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
})

export default store