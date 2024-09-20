import { createContext, useReducer } from "react";
import { initialState, reducer } from "./components/reducer/UseReducer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/HomePage";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/SinglePage/SinglePage";
import Login from "./routes/login/Login";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/Register";
import Logout from "./routes/logout";
import AboutPage from "./routes/aboutPage/AboutPage";
import Dashboard from "./routes/dashboard/Dashboard";
import ApplyPage from "./routes/applyPage/ApplyPage";
import SAGLogin from "./routes/sagLogin/SAGLogin";
import SAGDashboard from "./routes/sagDashboard/SAGDashboard";
import HealthRecordDetail from "./components/healthRecordDetail/HealthrecordDetail";
import AddHealthRecord from "./components/addHealthRecord/AddHealthrecord";

export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/list", element: <ListPage /> },
      { path: "/singlePage", element: <SinglePage /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      { path: "/aboutPage", element: <AboutPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/apply", element: <ApplyPage /> },
      { path: "/sag-login", element: <SAGLogin /> },
      { path: "/sag-dashboard", element: <SAGDashboard /> },
      { path: "/health-records", element: <AddHealthRecord /> },
      { path: "/health-records/:id", element: <HealthRecordDetail /> },
    ],
  },
]);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
