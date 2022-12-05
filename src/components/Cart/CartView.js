import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import styles from "./CartView.module.css";

class CartView extends Component {
  render() {
    const totalPrice = this.props.cart.items
      .map(
        (i) =>
          i.prices.find(
            (cur) => cur.currency.label === this.props.currency.label
          ).amount * i.quantity
      )
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    return (
      <div className={styles.cart} id="mainCart">
        <div className={styles.title}>cart</div>
        <div className={styles.separator}></div>
        {this.props.cart.items.map((i) => (
          <CartItem
            minicart={false}
            key={`${i.id}${JSON.stringify(i.attributesSelected)}`}
            className={`${i.id}${JSON.stringify(i.attributesSelected).replace(
              /[\W_]/g,
              ""
            )}`}
            id={i.id}
            brand={i.brand}
            name={i.name}
            prices={i.prices}
            // totalPrice={i.totalPrice}
            attributes={i.attributes}
            attributesSelected={i.attributesSelected}
            quantity={i.quantity}
            gallery={i.gallery}
            item={i}
          />
        ))}

        <div className={styles.summary}>
          <div className={styles.data}>
            <div className={styles.labels}>
              <span className={styles.label}>Tax 21%:</span>
              <span className={styles.label}>Quantity:</span>
              <span className={styles.labelTotal}>Total:</span>
            </div>
            <div className={styles.values}>
              <span className={styles.value}>
                {this.props.currency.symbol}
                {(totalPrice * 0.21).toFixed(2)}
              </span>
              <span className={styles.value}>
                {this.props.cart.totalQuantity}
              </span>
              <span className={styles.value}>
                {this.props.currency.symbol}
                {totalPrice}
              </span>
            </div>
          </div>
          <button className={styles.order}>order</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(CartView);
// this.props.cart.items.map(i => (i.prices.find(cur => cur.currency.label === this.props.currency.label).amount * i.quantity))
