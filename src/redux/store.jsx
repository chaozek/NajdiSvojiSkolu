import { configureStore } from "@reduxjs/toolkit";
import skolyReducer from "./skolySlice";

export default configureStore({
  reducer: {
    skoly: skolyReducer,
  },
});
