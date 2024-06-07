import { useEffect, useState } from "react";
import { SigneupProvider, authActions, AuthStatus } from "./SigneupReducer";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AuthController } from "../../../controllers/AuthController";
import { signeupUri } from "../../../utils/EndPoints";
import CoustomAlert from '../../components/CoustomAlert'
import { homeRoute, signeupRoute} from '../../../utils/Routes'
import {setDataToLocalStorage  ,isDataPresentInLocalStorage } from '../../../utils/LocalStorage'

const SigneupScreen = () => {
  const { signeupState, signeupStateDispatch } = SigneupProvider();
  const [showPassword, setShowPassword] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate()


  const signeupData = {
    username: signeupState.userName,
    email: signeupState.email,
    password: signeupState.password,
  };

  async function onClickSigneup(e) {
    signeupStateDispatch({ type: authActions.SIGNEUP_REQUEST });
    try {
      e.preventDefault();
      const value = await AuthController.signeupUserController(
        signeupUri,
        signeupData
      );
      if (value.data.success == true) {
        signeupStateDispatch({
          type: authActions.SIGNEUP_SUCCESS,
          payload: {
            status: AuthStatus.SUCCESS,
            userInformation: value.data.user,
            balance: value.data.balance,
            token: value.headers["auth-token"],
            signeIn: value.data.success,
          },
        });
        await setDataToLocalStorage("token", value.headers["auth-token"] )
        // navigate(homeRoute)
        navigate(homeRoute ,{ replace: true })
        
      } else {
      console.log('message', value.data.message)
        signeupStateDispatch({
          type: authActions.SIGNEUP_FAILURE,
          payload: { errorMessage: value.data.message },
        });
        setShowModel(!showModel);
        setTimeout(() => {
          setShowModel(false);
        }, 2000);
      }
    } catch (error) {
      signeupStateDispatch({
        type: authActions.SIGNEUP_FAILURE,
        payload: { errorMessage: error.message.toString() },
      });
      setShowModel(!showModel);
      setTimeout(() => {
        setShowModel(false);
      }, 2000);
    }
  }

  async function navigateToHome(){
    let isPresent = await isDataPresentInLocalStorage('token')
    if (isPresent == true) {
      navigate(homeRoute ,{ replace: true })
    }else{
      navigate(signeupRoute ,{ replace: true })
    }
  }

  useEffect(() => {
    navigateToHome()
    return () => {}
  }, [])
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      { showModel ? <CoustomAlert title={signeupState.errorMessage}/> : <div></div>}
        <div className="flex items-center justify-center h-14">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            SigneUp {signeupState.userName}
          </h2>
        </div>

        <form onSubmit={onClickSigneup}>
          <div className="mb-4">
            <div className="">
              <label className="input input-bordered flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={signeupState.email}
                  onChange={(e) =>
                    signeupStateDispatch({
                      type: authActions.USER_EMAIL,
                      payload: { email: e.target.value },
                    })
                  }
                />
              </label>
            </div>

            <div className="mt-3 ">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={signeupState.userName}
                  onChange={(e) =>
                    signeupStateDispatch({
                      type: authActions.USER_NAME,
                      payload: { userName: e.target.value },
                    })
                  }
                />
              </label>
            </div>

            <div className="mt-3">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "password" : "text"}
                  className="grow"
                  value={signeupState.password}
                  onChange={(e) =>
                    signeupStateDispatch({
                      type: authActions.USER_PASSWORD,
                      payload: { password: e.target.value },
                    })
                  }
                />
                {showPassword ? (
                  <IoMdEyeOff onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <IoMdEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </label>
            </div>

            <button className="btn btn-active btn-neutral h-10 mt-6 w-full grow">
              SigneUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigneupScreen;
