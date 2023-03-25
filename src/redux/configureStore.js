import { combineReducers, createStore, applyMiddleware } from "redux";
import { createForm } from 'react-redux';
import { loginForm } from "./loginForm";
import { login } from "./loginReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = () => {

  const store = createStore(combineReducers({
    login: login,
    ...createForm({
      userLogin: loginForm
    })
  }), applyMiddleware(thunk, logger)
  );

  return store;
}