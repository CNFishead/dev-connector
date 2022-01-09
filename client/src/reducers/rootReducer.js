import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import {
  userAuthReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./authReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
