import React, { Component } from "react";
import styles from "./CartOverlay.module.css";
import Minicart from "./Cart/Minicart";

export default class CartOverlay extends Component {
  render() {
    return (
      <div className={styles.cartOverlay}>
        <Minicart />
      </div>
    );
  }
}
