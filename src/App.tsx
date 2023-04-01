import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartContext } from "./context/cartContext";
import { MenuContext } from "./context/menuContext";
import { Product, CartItem } from "./types";

function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const addItemToCart = (product: Product, count: number) => {
    const item = cart.find((item) => item.id === product.id);

    if (item) {
      item.count += count;
      setCart([...cart]);
    } else {
      setCart([...cart, { id: product.id, product, count: 1 }]);
    }
    if (item?.count === 0) removeItemFromCart(item.id);
  };

  const removeItemFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, clearCart }}
    >
      <MenuContext.Provider value={{ open, setOpen }}>
        <div className="App">
          <Header />
          <div className={`overlay ${open ? "active" : ""}`}>
            <Outlet />
            <Footer />
          </div>
        </div>
      </MenuContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
