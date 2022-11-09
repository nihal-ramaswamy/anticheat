import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import testIdSlice from "./features/testId/testId.slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    testId: testIdSlice,
  },
});
