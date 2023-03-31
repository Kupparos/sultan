import React, { useEffect, useState, useContext } from "react";
import { Product } from "../types";
import style from "../styles/itemCard.module.css";
import { sizeIcon } from "../utils";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

export default function ItemCard({ item }: { item: Product }) {
  const [showPopover, setShowPopover] = useState(false);
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    if (showPopover) {
      const timer = setTimeout(() => {
        setShowPopover(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopover]);

  const handleButtonClick = (product: Product) => {
    addItemToCart(product, 1);
    setShowPopover(!showPopover);
  };

  return (
    <div className={style.card}>
      <div className={style.image}>
        {item.image ? (
          <img
            src={require(`../assets/products/${item.image}.png`)}
            alt="img"
          />
        ) : (
          <img
            src="https://api.iconify.design/ic:outline-photo-camera.svg?color=%233f4e65"
            alt="img"
          />
        )}
      </div>
      <div className={style.size}>
        {sizeIcon(item.size_type)}
        <p>
          {item.size} {item.size_type}
        </p>
      </div>
      <div className={style.title}>
        <Link to={`/${item.barcode}`} state={{ item }}>
          <h1>
            {item.brand} <span>{item.name}</span>
          </h1>
        </Link>
      </div>
      <div className={style.info}>
        <p>
          <span>Штрихкод: </span>
          {item.barcode}
        </p>
        <p>
          <span>Производитель: </span>
          {item.manufacturer}
        </p>
        <p>
          <span>Бренд: </span>
          {item.brand}
        </p>
      </div>
      <div className={style.footer}>
        <h2>{item.price ? item.price.replace(/\./g, ",") : '0'} &#8376;</h2>
        {showPopover && (
          <div className={style.popover}>Добавлено в корзину</div>
        )}
        <button onClick={() => handleButtonClick(item)}>
          В КОРЗИНУ{" "}
          <img
            src="https://api.iconify.design/gg:shopping-cart.svg?color=%23ffffff"
            alt="cart"
          />
        </button>
      </div>
    </div>
  );
}
