import  { useReducer } from 'react';

const AuthStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

const authState = {
  status: AuthStatus.IDLE,
  userInformation: null,
  balance: 0,
  token: null,
  logedin : false ,
  errorMessage : null,
  userName :null,
  password :null ,
};



const authActions = {
  USER_NAME: 'USER_NAME',
  USER_PASSWORD: 'USER_PASSWORD',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.USER_NAME:
      return { ...state, userName :  action.payload.userName};
    case authActions.USER_PASSWORD:
      return { ...state, password : action.payload.password };
    case authActions.LOGIN_REQUEST:
      return { ...state, status: AuthStatus.LOADING };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        status: AuthStatus.SUCCESS,
        userInformation: action.payload.userInformation,
        balance: action.payload.balance,
        token: action.payload.token,
        logedin: true,
      };
    case authActions.LOGIN_FAILURE:
      return { ...state, status: AuthStatus.FAILURE, userInformation: null, balance: 0, token: null , errorMessage: action.payload.errorMessage , logedin : false };
    case authActions.LOGOUT:
      return { ...state, status: AuthStatus.IDLE, userInformation: null, balance: 0, token: null ,  errorMessage: null , logedin : false };
    default:
      return state;
  }
}

const LoginProvider = () => {
  const [loginState, loginStateDispatch] = useReducer(authReducer, authState);

  return { loginState, loginStateDispatch };
}

export {LoginProvider ,authActions  , AuthStatus}




