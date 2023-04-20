import * as ActionCreator from "./ActionCreator";

export const Login = (
  state={ 
    isLoading: false, 
    errMess: null, 
    user: [], 
    isAuthenticated: localStorage.getItem('token') ? true : false },
     action) => {
  switch (action.type) {
    case ActionCreator.LOGIN_REQUEST:
      return { ...state, isLoading: true, errMess: null, isAuthenticated: false }

    case ActionCreator.LOGIN_RECEIVED:
      return { ...state, isLoading: false, errMess: null, user: action.payload, isAuthenticated: true }

    case ActionCreator.LOGIN_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, isAuthenticated: false }

    case ActionCreator.LOGOUT_REQUEST:
      return { ...state, isLoading: true, errMess: null, isAuthenticated: true }
    
    case ActionCreator.LOGOUT_RECEIVED:
      return { ...state, isLoading: false, errMess: null, user: null, isAuthenticated: false }

    default:
      return state
  }
};