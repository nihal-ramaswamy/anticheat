import { createSlice } from "@reduxjs/toolkit";

export const testIdSlice = createSlice({
  name: "testId",
  initialState: {
    testId: ""
  },
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload;
    }
  }
});

export const { setTestId } = testIdSlice.actions;
export default testIdSlice.reducer;
