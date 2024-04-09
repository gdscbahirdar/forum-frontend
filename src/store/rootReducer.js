import { combineReducers } from "redux";
import theme from "./theme/themeSlice";
import auth from "./auth";
import base from "./base";
import meta from "./meta";

const rootReducer = asyncReducers => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    base,
    meta,
    ...asyncReducers
  });
  return combinedReducer(state, action);
};

export default rootReducer;
