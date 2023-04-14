import React, { useContext, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/cardProduct.module.css";
import { sizeIcon } from "../utils";
import { Product } from "../types";
import { CartContext } from "../context/cartContext";
import goodsFromJSON from "../goods.json";

const productsFromLS = JSON.parse(localStorage.getItem("products") || "[]");
const dataProducts = productsFromLS.length ? productsFromLS : goodsFromJSON;

export default function CardProduct() {
  const location = useLocation();
  console.log(location);
  const product: Product = location.state
    ? location.state.item
    : dataProducts.find(
        (item: Product) => item.barcode === location.pathname.replace("/", "")
      );

      console.log(product);

  const { addItemToCart } = useContext(CartContext);
  const [count, setCount] = useState<number>(1);

  const handleButtonClick = (product: Product) => {
    addItemToCart(product, count);
  };

  const decrement = () => {
    if (count < 2) {
      return;
    }
    setCount(count - 1);
  };

  return (
    <div className={styles.cart_product} data-testid="card-product-part">
      <div className="container">
        <div className={styles.bread_crumbs}>
          <BreadCrumbs />
        </div>
        <div className={styles.back}>
          <Link to="/">
            <button>
              <>&#60;</>
            </button>
          </Link>
        </div>
        <div className={styles.main}>
          <div className={styles.main_image}>
            <img
              src={require(`../assets/products/${product.image}.png`)}
              alt=""
            />
          </div>
          <div className={styles.main_description}>
            <div className={styles.stock}>
              <p>В наличии</p>
            </div>
            <div className={styles.title}>
              <h1>
                {product.brand} <span>{product.name}</span>
              </h1>
            </div>
            <div className={styles.size}>
              {sizeIcon(product.size_type)}
              <p>
                {product.size} {product.size_type}
              </p>
            </div>
            <div className={styles.cart}>
              <div className={styles.price}>
                <h2>{product.price.replace(/\./g, ",")} &#8376;</h2>
              </div>
              <div className={styles.count}>
                <button onClick={decrement}>-</button>
                {count}
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <div className={styles.toCart}>
                <button onClick={() => handleButtonClick(product)}>
                  В корзину{" "}
                  <img
                    src="https://api.iconify.design/gg:shopping-cart.svg?color=%23ffffff"
                    alt="cart"
                  />
                </button>
              </div>
            </div>
            <div className={styles.share}>
              <div className={styles.share_icon}>
                <img
                  src="https://api.iconify.design/material-symbols:share.svg?color=%23FFC85E"
                  alt=""
                />
              </div>
              <div className={styles.share_info}>
                <p>
                  При покупке от <b>10 000 &#8376;</b> бесплатная доставка по
                  Кокчетаву и области
                </p>
              </div>
              <div className={styles.share_price_list}>
                Прайс-лист{" "}
                <img
                  src="https://api.iconify.design/bx:bxs-download.svg?color=%233F4E65"
                  alt="catalog"
                />
              </div>
            </div>
            <div className={styles.info}>
              <p>
                <span>Производитель: </span>
                {product.manufacturer}
              </p>
              <p>
                <span>Бренд: </span>
                {product.brand}
              </p>
              <p>
                <span>Артикул: </span>
                {product.barcode.slice(0, 6)}
              </p>
              <p>
                <span>Штрихкод: </span>
                {product.barcode}
              </p>
            </div>
            <div className={styles.description}>
              <details>
                <summary>Описание</summary>
                <p>{product.description}</p>
              </details>
            </div>
            <hr />
            <div className={styles.characteristics}>
              <details>
                <summary>Характеристики</summary>
                <p>
                  <span>Назначение: </span>
                  {product.brand}
                </p>
                <p>
                  <span>Тип: </span>
                  {product.brand}
                </p>
                <p>
                  <span>Производитель: </span>
                  {product.manufacturer}
                </p>
                <p>
                  <span>Бренд: </span>
                  {product.barcode}
                </p>
                <p>
                  <span>Артикул: </span>
                  {product.barcode}
                </p>
                <p>
                  <span>Штрихкод: </span>
                  {product.barcode}
                </p>
                <p>
                  <span>Вес: </span>
                  {product.size} {product.size_type}
                </p>
                <p>
                  <span>Объем: </span>
                  {product.size} {product.size_type}
                </p>
                <p>
                  <span>Кол-во в коробке: </span>
                  {product.size} {product.size_type}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
