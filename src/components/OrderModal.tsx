import React from "react";
import styles from "../styles/orderModal.module.css";

export default function OrderModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.close}>
          <button onClick={closeModal}>
            <img
              src="https://api.iconify.design/ic:sharp-close.svg?color=%23FFC85E"
              alt=""
            />
          </button>
        </div>
        <div className={styles.main}>
          <div className={styles.image}>
            <img
              src="https://api.iconify.design/mdi:check-all.svg?color=%23ffffff"
              alt=""
            />
          </div>
          <h2>Спасибо за заказ</h2>
          <p>Наш менеджер свяжется с вами в ближайшее время</p>
        </div>
      </div>
    </div>
  );
}
