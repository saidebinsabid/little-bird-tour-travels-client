import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";

// CLIENT state only. Server data belongs to React Query, not here.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
