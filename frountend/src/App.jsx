import "./App.css";
import LoginScreen from "./views/screens/login/LoginScreen";
import SigneupScreen from "./views/screens/signeup/SigneupScreen";
import HomeScreen from "./views/screens/home/HomeScreen";
import {loginRoute , signeupRoute , homeRoute} from './utils/Routes'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen/>,
  },
  {
    path: loginRoute,
    element: <LoginScreen/>,
  },
  {
    path: signeupRoute,
    element: <SigneupScreen/>,
  },
  {
    path: homeRoute,
    element: <HomeScreen/>,
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
