import { combineReducers, createStore, applyMiddleware } from "redux";
import { createForms } from 'react-redux-form';
import { loginForm } from "./loginForm";
import { Login } from "./AuthReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {

  const store = createStore(combineReducers({
    login: Login,
    ...createForms({
      userLogin: loginForm
    })
  }), applyMiddleware(thunk, logger)
  );

  return store;
}
