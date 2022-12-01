import React, { Component } from "react";
import styles from "./CartOverlay.module.css";
import Minicart from "./Cart/Minicart";

export default class CartOverlay extends Component {
  render() {
    // const onClickOverlay = (e) => {
    //   if (e.target === e.currentTarget) {
    //     this.props.onToggleMinicart();
    //   }
    // };

    return (
      <div className={styles.cartOverlay} >
        <Minicart />
      </div>
    );
  }
}
