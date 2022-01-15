import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { userLoginReducer, userRegisterReducer } from "./authReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: userLoginReducer,
  userRegister: userRegisterReducer,
});
