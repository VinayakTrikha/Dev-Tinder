import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Chat from "./components/Chat";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "chat/:targetId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
];

const router = createBrowserRouter(routes);

function App() {

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
