import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Admin from "./pages/Admin";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import CardProduct from "./pages/CardProduct";

const routes = [
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
];

describe("router test", () => {
  test("test catalog link", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    const catalogLink = screen.getByTestId("Каталог");
    userEvent.click(catalogLink);
    expect(screen.getByTestId("catalog-part")).toBeInTheDocument();
  });
  test("test cart link", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/Корзина"],
    });
    render(<RouterProvider router={router} />);
    const cartLink = screen.getByTestId("Корзина");
    userEvent.click(cartLink);
    expect(screen.getByTestId("cart-part")).toBeInTheDocument();
  });
  test("test product link", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/4604049097548"],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    const productLink = screen.getByTestId('4604049097548');
    userEvent.click(productLink);
    expect(screen.getByTestId("card-product-part")).toBeInTheDocument();
  });

  test("Admin page test", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/admin"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("admin-page")).toBeInTheDocument();
  });
});
