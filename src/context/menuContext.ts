import React, {createContext } from "react";

export const MenuContext = createContext({
   open: false,
   setOpen: (open: boolean) => {},
 });