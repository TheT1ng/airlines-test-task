import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";

const rootReducer = () =>
  combineReducers({
    ticketsReducer
  });

export default rootReducer;
