/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import todoreducer from "./slices/todoSlice";
export const store = configureStore({
  reducer: {
    todo: todoreducer,
  },
});
