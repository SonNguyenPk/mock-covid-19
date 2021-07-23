import { combineReducers } from "redux";
import { globalReducer } from "./Slices/globalSlice";

const rootReducer = combineReducers({
  global: globalReducer,
});

export default rootReducer;
