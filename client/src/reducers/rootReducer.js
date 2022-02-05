import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: authReducer,
  // News feed related reducers
  newsFeed: postReducer,
  // Profile Related Reducers
  profile: profileReducer,
});
