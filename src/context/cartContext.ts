import React, {createContext } from "react";
import { CartContextType } from "../types";

export const CartContext = createContext<CartContextType>({
   cart: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   clearCart: () => {},
 });
