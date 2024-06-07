import { useState, useEffect } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { LoginProvider, authActions, AuthStatus } from "./LoginReducer";
import { useNavigate , Link } from "react-router-dom";
import { AuthController } from "../../../controllers/AuthController";
import { loginUri } from "../../../utils/EndPoints";
import CoustomAlert from "../../components/CoustomAlert";
import { homeRoute, loginRoute, signeupRoute } from "../../../utils/Routes";
import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
  isDataPresentInLocalStorage,
} from "../../../utils/LocalStorage";

const LoginScreen = () => {
  const { loginState, loginStateDispatch } = LoginProvider();
  const [showPassword, setShowPassword] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();

  const loginData = {
    username: loginState.userName,
    password: loginState.password,
  };

  async function onClickLogin(e) {
    loginStateDispatch({ type: authActions.LOGIN_REQUEST });
    try {
      e.preventDefault();
      const value = await AuthController.signeupUserController(
        loginUri,
        loginData
      );
      if (value.data.success == true) {
        loginStateDispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: {
            status: AuthStatus.SUCCESS,
            userInformation: value.data.user,
            balance: value.data.balance,
            token: value.headers["auth-token"],
            signeIn: value.data.success,
          },
        });
        await setDataToLocalStorage("token", value.headers["auth-token"]);
        // navigate(homeRoute);
        navigate(homeRoute ,{ replace: true })
      } else {
        console.log("message", value.data.message);
        loginStateDispatch({
          type: authActions.LOGIN_FAILURE,
          payload: { errorMessage: value.data.message },
        });
        setShowModel(!showModel);
        setTimeout(() => {
          setShowModel(false);
        }, 2000);
      }
    } catch (error) {
      loginStateDispatch({
        type: authActions.LOGIN_FAILURE,
        payload: { errorMessage: error.message.toString() },
      });
      setShowModel(!showModel);
      setTimeout(() => {
        setShowModel(false);
      }, 2000);
    }
  }

  async function navigateToHome() {
    let isPresent = await isDataPresentInLocalStorage("token");
    if (isPresent == true) {
      navigate(homeRoute, { replace: true });
    } else {
      navigate(loginRoute, { replace: true });
    }
  }

  useEffect(() => {
    navigateToHome();
    return () => {};
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {showModel ? (
          <CoustomAlert title={loginState.errorMessage} />
        ) : (
          <div></div>
        )}
        <div className="flex items-center justify-center h-14">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            LogIn {loginState.userName}
          </h2>
        </div>

        <form onSubmit={onClickLogin}>
          <div className="mb-4">
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
                  value={loginState.userName}
                  onChange={(e) =>
                    loginStateDispatch({
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
                  value={loginState.password}
                  onChange={(e) =>
                    loginStateDispatch({
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

            <button className="btn btn-active btn-neutral h-10 mt-4 w-full grow">
              LogoIn
            </button>


            <Link to='/signeup'>dont have account signeup ?</Link>


          
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
