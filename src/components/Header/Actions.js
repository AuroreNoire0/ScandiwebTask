import React from "react";
import styles from "./Actions.module.css";
import miniCart from "../../svg/miniCart.svg";
import arrowDown from "../../svg/arrowDown.svg";

export default class Actions extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.currencies}>
          <div>$</div>
          <img
            src={arrowDown}
            alt="Arrow to open or close select currency window."
          />
        </div>
        <img src={miniCart} alt="Minicart icon" onClick={this.props.onToggleMinicart} />
      </div>
    );
  }
}
