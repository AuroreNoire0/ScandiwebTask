import React from "react";
import styles from "./Minicart.module.css";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { cartActions } from "../../slices/cart-slice";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

class Minicart extends React.Component {
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

    const onViewBag = (e) => {
      this.props.navigate("/cart");
    };
    const onClickMinicart = (e) => {
      e.target.id !== "viewBag" && e.stopPropagation();
    };

    const onCheckOut = () => {
      this.props.dispatch(cartActions.checkOut());
    };

    return (
      <div id="minicart" className={styles.minicart} onClick={onClickMinicart}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span className={styles.bag}> My bag,</span>
            <span>
              {" "}
              {this.props.cart.totalQuantity}{" "}
              {this.props.cart.totalQuantity === 1 ? "item" : "items"}{" "}
            </span>
          </div>
          <div className={styles.products}>
            {this.props.cart.items.map((i) => (
              <CartItem
                minicart={true}
                key={`${i.id}${JSON.stringify(i.attributesSelected)}`}
                // className={`${i.id}${JSON.stringify(i.attributesSelected).replace(/[^a-zA-Z0-9 ]/g, '')}`}
                className={`${i.id}${JSON.stringify(
                  i.attributesSelected
                ).replace(/[\W_]/g, "")}`}
                id={i.id}
                brand={i.brand}
                name={i.name}
                prices={i.prices}
                totalPrice={i.totalPrice}
                attributes={i.attributes}
                attributesSelected={i.attributesSelected}
                quantity={i.quantity}
                gallery={i.gallery}
                item={i}
              />
            ))}
          </div>
          <div className={styles.total}>
            <span className={styles.label}>Total</span>
            <span className={styles.value}>
              {this.props.currency.symbol}
              {totalPrice}
            </span>
          </div>
          <div className={styles.buttons}>
            <button id="viewBag" className={styles.viewBag} onClick={onViewBag}>
              view bag
            </button>
            <button className={styles.checkOut} onClick={onCheckOut}>
              check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(withRouter(Minicart));
