import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";

export const rootReducer = combineReducers({ alert: alert });
