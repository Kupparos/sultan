import React, { useContext, useState } from "react";
import styles from "../styles/cart.module.css";
import BreadCrumbs from "../components/BreadCrumbs";
import { CartItem } from "../types";
import { Link } from "react-router-dom";
import { sizeIcon } from "../utils";
import OrderModal from "../components/OrderModal";
import { CartContext } from "../context/cartContext";

export default function Cart() {
  const { cart, addItemToCart, removeItemFromCart, clearCart } =
    useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkout = () => {
    setIsModalOpen(true);
    clearCart();
  };

  return (
    <div className={styles.cart} data-testid="cart-part">
      {isModalOpen && <OrderModal closeModal={closeModal} />}
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
          <h2>КОРЗИНА</h2>
          <div className={styles.cart_items}>
            {cart.length ? (
              cart.map((item: CartItem) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.product_block}>
                    <div className={styles.image}>
                      {item.product.image ? (
                        <img
                          src={require(`../assets/products/${item.product.image}.png`)}
                          alt="img"
                        />
                      ) : (
                        <img
                          src="https://api.iconify.design/ic:outline-photo-camera.svg?color=%233f4e65"
                          alt="img"
                        />
                      )}
                    </div>
                    <div className={styles.info}>
                      <div className={styles.size}>
                        {sizeIcon(item.product.size_type)}
                        <p>
                          {item.product.size} {item.product.size_type}
                        </p>
                      </div>
                      <div className={styles.title}>
                        <h1>
                          {item.product.brand} <span>{item.product.name}</span>
                        </h1>
                      </div>
                      <div className={styles.description}>
                        <p>{item.product.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.main_block}>
                    <div className={styles.count}>
                      <button onClick={() => addItemToCart(item.product, -1)}>
                        -
                      </button>
                      {item.count}
                      <button onClick={() => addItemToCart(item.product, 1)}>
                        +
                      </button>
                    </div>
                    <div className={styles.price}>
                      <h2>
                        {(item.count * Number(item.product.price)).toFixed(2)}{" "}
                        &#8376;
                      </h2>
                    </div>
                    <div className={styles.delete}>
                      <button onClick={() => removeItemFromCart(item.id)}>
                        <img
                          src="https://api.iconify.design/material-symbols:delete.svg?color=%23ffffff"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>Пока нет товаров</h2>
            )}
          </div>
          <div className={styles.order}>
            <button onClick={checkout}>Оформить заказ</button>
            <h2>
              {cart
                .reduce(
                  (acc: number, item: CartItem) =>
                    acc + item.count * Number(item.product.price),
                  0
                )
                .toFixed(2)}{" "}
              &#8376;
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
