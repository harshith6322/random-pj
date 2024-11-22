import { createSlice } from "@reduxjs/toolkit";

const todoslice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addtodo: (state, action) => {
      state.push({
        id: new Date().toISOString(),
        completed: false,
        text: action.payload, // Fix: Use payload directly
      });
    },
  },
});

export const { addtodo } = todoslice.actions;
export default todoslice.reducer;
