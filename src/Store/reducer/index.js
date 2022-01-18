import { combineReducers } from "redux";
import { VerifyReducer } from "./Verify";
import { userReducers } from "./UserReducer";

const reducers = combineReducers({
  verify: VerifyReducer,
  userData: userReducers,
});

export default reducers;
