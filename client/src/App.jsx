import HomePage from "./routes/homePage/HomePage";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SinglePage from "./routes/SinglePage/SinglePage";
import Login from "./routes/login/Login";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/Register";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./components/reducer/UseReducer";  // Corrected import
import Logout from "./routes/logout";
import AboutPage from "./routes/aboutPage/AboutPage";
import Dashboard from "./routes/dashboard/Dashboard";
import ApplyPage from "./routes/applyPage/ApplyPage";

export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/singlePage",
        element: <SinglePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout/>,
      },
      {
        path: "/aboutPage",
        element: <AboutPage/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/apply",
        element: <ApplyPage/>,
      },
    ],
  },
]);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // Corrected reducer and removed init

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
