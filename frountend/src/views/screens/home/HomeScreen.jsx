import { HomeProvider, homeActions, AppStatus } from "./HomeReducer";
import {HomeController  } from "../../../controllers/HomeController";
import { formatDate } from "../../../utils/DateFormater";
import CoustomModel from "../../components/CoustomModel";
import CoustomAlert from "../../components/CoustomAlert";
import {
  withdrawUri,
  depositUri,
  transactionUri,
} from "../../../utils/EndPoints";
import { useState , useEffect } from "react";




const HomeScreen = () => {
  const { homeDataState, homeDataStateDispatch } = HomeProvider();
  const [showModel, setShowModel] = useState(false);

  async function getTransaction() {
    homeDataStateDispatch({ type: homeActions.HOME_REQUEST });
    try {
      const value = await HomeController.getTransactionListController(transactionUri,);
      if (value.data.success == true) {
        console.log(value.data.transactionList);
        homeDataStateDispatch({
          type: homeActions.HOME_SUCCESS,
          payload: {
            userInformation: value.data.user,
            balance: value.data.balance,
            transaction: value.data.transactionList,
          },
        });
      } else {
        console.log("message", value.data.message);
        homeDataStateDispatch({
          type: homeActions.HOME_FAILURE,
          payload: { errorMessage: value.data.message },
        });
      }
    } catch (error) {
      homeDataStateDispatch({
        type: homeActions.HOME_FAILURE,
        payload: { errorMessage: error.message.toString() },
      });
    }
  }

  async function withDrawAmount(inputValue) {
    try {
      const value = await HomeController.amountController(withdrawUri,{'amount' :inputValue.toString()});
      if (value.data.success == true) {
        homeDataStateDispatch({
          type: homeActions.WITHDRAW_AMOUNT,
          payload: {
            balance: value.data.transaction.balance,
            transaction: [...homeDataState.transaction, value.data.transaction],
          },
        });
      } else {
        homeDataStateDispatch({
          type: homeActions.WITHDRAW_AMOUNT_FAILURE,
          payload: { errorMessage: value.data.message },
        });
        setShowModel(!showModel);
        setTimeout(() => {
          setShowModel(false);
        }, 2000);
      }
    } catch (error) {
      homeDataStateDispatch({
        type: homeActions.WITHDRAW_AMOUNT_FAILURE,
        payload: { errorMessage: error.message.toString() },
      });
      setShowModel(!showModel);
      setTimeout(() => {
        setShowModel(false);
      }, 2000);
    }
  }

  async function DebitAmount(inputValue) {
    try {
      const value = await HomeController.amountController(depositUri,{'amount' :inputValue.toString()});
      if (value.data.success == true) {
        homeDataStateDispatch({
          type: homeActions.DEPOSIT_AMOUNT,
          payload: {
            balance: value.data.transaction.balance,
            transaction: [...homeDataState.transaction, value.data.transaction],
          },
        });
      } else {
        homeDataStateDispatch({
          type: homeActions.DEPOSIT_AMOUNT_FAILURE,
          payload: { errorMessage: value.data.message },
        });
        setShowModel(!showModel);
        setTimeout(() => {
          setShowModel(false);
        }, 2000);
      }
    } catch (error) {
      homeDataStateDispatch({
        type: homeActions.DEPOSIT_AMOUNT_FAILURE,
        payload: { errorMessage: error.message.toString() },
      });
      setShowModel(!showModel);
      setTimeout(() => {
        setShowModel(false);
      }, 2000);
    }
  }

  useEffect(() => {
    getTransaction();
    return () => {};
  }, []);

  if (homeDataState.status == AppStatus.FAILURE) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="mt-4 text-gray-600">Some error occured</p>
        </div>
      </div>
    );
  }

  if (
    homeDataState.status == AppStatus.LOADING ||
    homeDataState.status == AppStatus.IDLE
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
       { showModel ? <CoustomAlert title={homeDataState.errorMessage}/> : <div></div>}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        {`Rs ${homeDataState.balance}`}
      </h1>

      <div className="flex justify-between items-center mb-10">
        <CoustomModel onDataSubmit={withDrawAmount} buttonText='Withdraw' />
        <CoustomModel onDataSubmit={DebitAmount} buttonText ='Deposit' />

        {/* <CoustomModel modelId = "Widraw-Money-Model"/> */}
      </div>

      <h2 className="text-lg font-semibold mb-10">Transaction List</h2>

      <ul className="divide-y divide-gray-200">
        {homeDataState.transaction.map((transaction, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-gray-800">{`Total Balance remaining :  ${transaction.balance}`}</p>
              <p className="text-sm text-gray-500">
                {formatDate(transaction.date)}
              </p>
            </div>
            <p
              className={`text-lg font-semibold ${
                transaction.type != "withdraw"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type == "withdraw"
                ? `- ${transaction.amount.toFixed(2)}`
                : `+ ${transaction.amount.toFixed(2)}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
