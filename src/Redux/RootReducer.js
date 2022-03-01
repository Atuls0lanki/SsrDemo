import { combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer";

const rootReducer = combineReducers({
  user: AuthReducer,
});

export default rootReducer;
