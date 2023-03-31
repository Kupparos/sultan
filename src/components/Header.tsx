import React, { useContext } from "react";
import style from "../styles/header.module.css";
import logo from "../assets/logo.svg";
import call_center from "../assets/call_center.png";
import Burger from "./Burger";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import { CartItem } from "../types";
import { MenuContext } from "../context/menuContext";
import { CartContext } from "../context/cartContext";

export default function Header() {
  const { open } = useContext(MenuContext);
  const { cart } = useContext(CartContext);

  return (
    <div className={style.header}>
      <div className={style.top}>
        <div className="container">
          <div className={style.navigation}>
            <div className={style.info}>
              <div className={style.contact}>
                <img
                  src="https://api.iconify.design/fluent:location-48-regular.svg?color=%233F4E65"
                  alt="map"
                />
                <p>
                  г. Кокчетав, ул. Ж. Ташенова 129Б
                  <br />
                  <span>&#40;Рынок Восточный&#41;</span>
                </p>
              </div>
              <div className={style.contact}>
                <img
                  src="https://api.iconify.design/fluent:mail-16-regular.svg?color=%233F4E65"
                  alt="mail"
                />
                <p>
                  opt.sultan@mail.ru
                  <br />
                  <span>На связи в любое время</span>
                </p>
              </div>
            </div>
            <nav>
              <a href="#">О компании</a>
              <a href="#">Доставка и оплата</a>
              <a href="#">Возврат</a>
              <a href="#">Контакты</a>
            </nav>
          </div>
        </div>
      </div>
      <div className={style.main}>
        <div className="container">
          <div className={style.main_info}>
            <div className={style.burger}>
              <Burger />
            </div>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
              <h1>СУЛТАН</h1>
            </div>
            <div className={style.catalog}>
              <button>
                Каталог{" "}
                <img
                  src="https://api.iconify.design/uiw:appstore-o.svg?color=%23ffffff"
                  alt="catalog"
                />
              </button>
            </div>
            <div className={style.search}>
              <input type="text" placeholder="Поиск..." />
              <button>
                <img
                  src="https://api.iconify.design/ep:search.svg?color=%23ffffff"
                  alt="search"
                />
              </button>
            </div>
            <div className={style.call}>
              <div className={style.call_info}>
                <h3>+7 &#40;777&#41; 490-00-91</h3>
                <p>
                  время работы: 9:00-20:00
                  <br />
                  <a href="#">Заказать звонок</a>
                </p>
              </div>
              <img src={call_center} alt="call_center" />
            </div>
            <div className={style.price_list}>
              <button>
                Прайс-лист{" "}
                <img
                  src="https://api.iconify.design/bx:bxs-download.svg?color=%23ffffff"
                  alt="catalog"
                />
              </button>
            </div>
            <div className={style.cart}>
              <Link to="/Корзина">
                <img
                  src="https://api.iconify.design/gg:shopping-cart.svg?color=%233f4e65"
                  alt="cart"
                />
              </Link>
              <div className={style.cart_items}>{cart.reduce((acc: number, item: CartItem) => acc + item.count, 0)}</div>
              <p>
                <span>Корзина</span>
                <br />
                {cart.reduce((acc: number, item: CartItem) => acc + item.count * Number(item.product.price), 0).toFixed(2)} &#8376;
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.nav_mobile}>
        <div className={style.catalog_mobile}>
          <button>
            <img
              src="https://api.iconify.design/uiw:appstore-o.svg?color=%233F4E65"
              alt="catalog"
            />
            Каталог
          </button>
        </div>
        <div className={style.search_mobile}>
          <button>
            <img
              src="https://api.iconify.design/ep:search.svg?color=%233F4E65"
              alt="search"
            />
          </button>
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>
      {open && <SideMenu />}
    </div>
  );
}
