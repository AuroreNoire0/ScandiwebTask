import React from "react";
import styles from "./Minicart.module.css";
import CartItem from "./CartItem";

export default class Minicart extends React.Component {
  render() {
    return (
      <div className={styles.minicart}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span className={styles.bag}> My bag,</span>
            <span> 3 items</span>
          </div>
          <div className={styles.products}>
            <CartItem minicart={true}/>
            <CartItem minicart={true}/>
            <CartItem minicart={true}/>
          </div>
          <div className={styles.total}>
            <span className={styles.label}>Total</span>
            <span className={styles.value}>$200.00</span>

          </div>
          <div className={styles.buttons}>
            <button className={styles.viewBag}>view bag</button>
            <button className={styles.checkOut}>check out</button>
          </div>
        </div>
      </div>
    );
  }
}
