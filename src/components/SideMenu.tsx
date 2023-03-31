import React from "react";
import style from "../styles/sideMenu.module.css";

export default function SideMenu() {
  return (
    <div className={style.side}>
      <div className="container">
        <div className={style.side_contact}>
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
          <div className={style.call}>
            <img
              src="https://api.iconify.design/ph:phone.svg?color=%233f4e65"
              alt="phone"
            />
            <div className={style.call_info}>
              <p>
                Отдел продаж <br /> <span>+7 &#40;777&#41; 490-00-91</span>
              </p>
              <span>время работы: 9:00-20:00</span>
            </div>
          </div>
          <div className={style.order_call}>
            <div className={style.order_call_img}>
              <img
                src="https://api.iconify.design/mdi:phone.svg?color=%23ffffff"
                alt="phone"
              />
            </div>
            <a href="#">Заказать звонок</a>
          </div>
        </div>
        <div className={style.side_menu}>
          <h1>Меню сайта:</h1>
          <nav>
            <a href="#">О компании</a>
            <a href="#">Доставка и оплата</a>
            <a href="#">Возврат</a>
            <a href="#">Контакты</a>
          </nav>
          <div className={style.price_list}>
            <button>
              Прайс-лист{" "}
              <img
                src="https://api.iconify.design/bx:bxs-download.svg?color=%23ffffff"
                alt="catalog"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
