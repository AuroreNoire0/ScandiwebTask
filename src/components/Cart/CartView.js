import React, { Component } from "react";
import CartItem from "./CartItem";
import styles from "./CartView.module.css";

export default class CartView extends Component {
  render() {
    return (
      <div className={styles.cart}>
        <div className={styles.title}>cart</div>
        <div className={styles.separator}></div>

        <CartItem minicart={false} />

        <CartItem />
        <CartItem />
        <CartItem />
        <div className={styles.summary}>
          <div className={styles.data}>
            <div className={styles.labels}>
              <span className={styles.label}>Tax 21%:</span>
              <span className={styles.label}>Quantity:</span>
              <span className={styles.labelTotal}>Total:</span>
            </div>
            <div className={styles.values}>
              <span className={styles.value}>$42</span>
              <span className={styles.value}>3</span>
              <span className={styles.value}>$200</span>
            </div>
          </div>
        <button className={styles.order}>order</button>
        </div>
      </div>
    );
  }
}
