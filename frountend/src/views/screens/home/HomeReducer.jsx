import  { useReducer } from 'react';

const AppStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

const homeState = {
  status: AppStatus.IDLE,
  userInformation: null,
  balance: 0,
  errorMessage : null,
  transaction :[],
};



const homeActions = {
  HOME_REQUEST: 'HOME_REQUEST',
  HOME_SUCCESS: 'HOME_SUCCESS',
  WITHDRAW_AMOUNT: 'WITHDRAW_AMOUNT',
  DEPOSIT_AMOUNT: 'DEPOSIT_AMOUNT',
  HOME_FAILURE: 'HOME_FAILURE',
  DEPOSIT_AMOUNT_FAILURE: 'DEPOSIT_AMOUNT_FAILURE',
  WITHDRAW_AMOUNT_FAILURE: 'WITHDRAW_AMOUNT_FAILURE',
};

const homeReducer = (state, action) => {
  switch (action.type) {
    case homeActions.HOME_REQUEST:
      return { ...state, status: AppStatus.LOADING };
    case homeActions.HOME_SUCCESS:
      return {
        ...state,
        status: AppStatus.SUCCESS,
        userInformation: action.payload.userInformation,
        balance: action.payload.balance,
        transaction: action.payload.transaction,
      };
    case homeActions.WITHDRAW_AMOUNT:
      return {
        ...state,
        status: AppStatus.SUCCESS,
        balance: action.payload.balance,
        transaction: action.payload.transaction,
      };
    case homeActions.DEPOSIT_AMOUNT:
      return {
        ...state,
        status: AppStatus.SUCCESS,
        balance: action.payload.balance,
        transaction: action.payload.transaction,
      };
    case homeActions.HOME_FAILURE:
      return { ...state, status: AppStatus.FAILURE, userInformation: null, balance: 0, errorMessage: action.payload.errorMessage };
    case homeActions.DEPOSIT_AMOUNT_FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    case homeActions.WITHDRAW_AMOUNT_FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
}

const HomeProvider = () => {
  const [homeDataState, homeDataStateDispatch] = useReducer(homeReducer, homeState);

  return { homeDataState, homeDataStateDispatch };
}

export {HomeProvider ,homeActions  , AppStatus}




