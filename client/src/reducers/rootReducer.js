import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: authReducer,
  newsFeed: postReducer,
});
