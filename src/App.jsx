import { createBrowserRouter, RouterProvider, Navigate , useNavigate } from "react-router-dom";
import { Home, LandingPage } from '@pages';
import { getcurrentUser } from "@FireContext";
import { useEffect } from "react";
import { NotFound } from "./components";

const App = () => {
  const currentUser = getcurrentUser();
  const ProtectedRoute = ({ children }) => {
    if ( currentUser ) { return children }
    return <Navigate to="/" />
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      children: [
        {
          path: "/home/folder/:folderId",
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
