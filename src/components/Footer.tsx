import React from "react";
import style from "../styles/footer.module.css";
import logo from "../assets/logo_white.svg";
import visa from "../assets/payment/Visa.png";
import mc from "../assets/payment/mc.png";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className="container">
        <div className={style.footer_container}>
          <div className={style.info}>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
              <h1>СУЛТАН</h1>
            </div>
            <p>
              Компания «Султан» — снабжаем розничные магазины товарами "под
              ключ" в Кокчетаве и Акмолинской области
            </p>
            <div className={style.subscribe}>
              <p>Подпишись на скидки и акции</p>
              <div className={style.email}>
                <input type="text" placeholder="Введите ваш E-mail" />
                <button>
                  <img
                    src="https://api.iconify.design/ic:baseline-greater-than.svg?color=%23ffffff"
                    alt="to"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={style.menu}>
            <div className={style.categories}>
              <h1>Меню сайта:</h1>
              <nav>
                <a href="#">О компании</a>
                <a href="#">Доставка и оплата</a>
                <a href="#">Возврат</a>
                <a href="#">Контакты</a>
              </nav>
            </div>
            <div className={style.categories}>
              <h1>Категории:</h1>
              <nav>
                <a href="#">Бытовая химия</a>
                <a href="#">Косметика и гигиена</a>
                <a href="#">Товары для дома</a>
                <a href="#">Товары для детей и мам</a>
                <a href="#">Посуда</a>
              </nav>
            </div>
          </div>
          <div className={style.price_list_download}>
            <h1>Скачать прайс-лист:</h1>
            <div className={style.price_list}>
              <button>
                Прайс-лист{" "}
                <img
                  src="https://api.iconify.design/bx:bxs-download.svg?color=%23ffffff"
                  alt="catalog"
                />
              </button>
            </div>
            <p>Связь в мессенджерах:</p>
            <div className={style.social_media}>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                style={{ backgroundColor: "#00E676" }}
              >
                <img
                  src="https://api.iconify.design/fa6-brands:whatsapp.svg?color=%23ffffff"
                  alt="whatsapp"
                />
              </a>
              <a
                href="https://telegram.org/"
                target="_blank"
                style={{ backgroundColor: "#40B3E0" }}
              >
                <img
                  src="https://api.iconify.design/ei:sc-telegram.svg?color=%23ffffff"
                  alt="telegram"
                />
              </a>
            </div>
          </div>
          <div className={style.contacts}>
            <h1>Контакты:</h1>
            <div className={style.call_info}>
                +7 &#40;777&#41; 490-00-91
                <br />
                <span>время работы: 9:00-20:00</span>
                <br />
                <a href="#">Заказать звонок</a>
            </div>
            <p>
              opt.sultan@mail.ru
              <br />
              <span>На связи в любое время</span>
            </p>
            <div className={style.payment}>
              <img src={visa} alt="visa" />
              <img src={mc} alt="mc" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
