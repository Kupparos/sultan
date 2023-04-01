import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import CardProduct from "./pages/CardProduct";
import Catalog from "./pages/Catalog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Catalog />,
      },
      {
        path: "/Корзина",
        element: <Cart />,
      },
      {
        path: "/:code",
        element: <CardProduct />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
