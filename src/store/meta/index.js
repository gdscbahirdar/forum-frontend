import { combineReducers } from "@reduxjs/toolkit";
import faculties from "./facultySlice";

const reducer = combineReducers({ faculties });

export default reducer;
