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
  signeIn : false ,
  errorMessage : null,
  userName :null,
  password :null ,
  email :null ,
};



const authActions = {
  USER_NAME: 'USER_NAME',
  USER_PASSWORD: 'USER_PASSWORD',
  USER_EMAIL: 'USER_EMAIL',
  SIGNEUP_REQUEST: 'SIGNEUP_REQUEST',
  SIGNEUP_SUCCESS: 'SIGNEUP_SUCCESS',
  SIGNEUP_FAILURE: 'SIGNEUP_FAILURE',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.USER_NAME:
      return { ...state, userName :  action.payload.userName};
    case authActions.USER_PASSWORD:
      return { ...state, password : action.payload.password };
    case authActions.  USER_EMAIL:
      return { ...state, email : action.payload.email };
    case authActions.SIGNEUP_REQUEST:
      return { ...state, status: AuthStatus.LOADING };
    case authActions.SIGNEUP_SUCCESS:
      return {
        ...state,
        status: AuthStatus.SUCCESS,
        userInformation: action.payload.userInformation,
        balance: action.payload.balance,
        token: action.payload.token,
        signeIn: true,
      };
    case authActions.SIGNEUP_FAILURE:
      return { ...state, status: AuthStatus.FAILURE, userInformation: null, balance: 0, token: null , errorMessage: action.payload.errorMessage , signeIn : false };
    default:
      return state;
  }
}

const SigneupProvider = () => {
  const [signeupState, signeupStateDispatch] = useReducer(authReducer, authState);

  return { signeupState, signeupStateDispatch };
}

export {SigneupProvider ,authActions , AuthStatus}




