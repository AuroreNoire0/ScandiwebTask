import React from "react";
import styles from "./Actions.module.css";
import emptyCart from "../../svg/emptyCart.svg";
import arrowDown from "../../svg/arrowDown.svg";

export default class Actions extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.currencies}>
          <div>$</div>
          <img
            src={arrowDown}
            alt="Arrow down to open select currency window."
          />
        </div>
        <img src={emptyCart} alt="Empty cart icon" />
      </div>
    );
  }
}
