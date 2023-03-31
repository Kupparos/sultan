import React, { useContext } from "react";
import { MenuContext } from "../context/menuContext";
import style from "../styles/burger.module.css";

export default function Burger() {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <div className={style.burger} onClick={() => setOpen(!open)}>
      {open ? <>&#10005;</> : <>&#9776;</>}
    </div>
  );
}
