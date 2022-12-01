import React from "react";
import styles from "./Actions.module.css";
import miniCart from "../../svg/miniCart.svg";
import arrowDown from "../../svg/arrowDown.svg";
import { connect } from "react-redux";

class Actions extends React.Component {
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
        <div id="minicartIcon" className={styles.minicartIcon}>
          <img
            src={miniCart}
            alt="Minicart icon"
            onClick={this.props.onToggleMinicart}
          />
          {this.props.cart.totalQuantity > 0 && (
            <div className={styles.minicartBadge}>
              {this.props.cart.totalQuantity}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(Actions);
