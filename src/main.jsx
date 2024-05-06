import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Routes/Login.jsx'
import Form from './Routes/Form.jsx'
import ErrorPage from "./ErrorPage";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Formulario",
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

