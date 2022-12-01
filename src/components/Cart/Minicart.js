import React from "react";
import styles from "./Minicart.module.css";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { cartActions } from "../../cart-slice";


const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

class Minicart extends React.Component {
  render() {
    const onViewBag = (e) => {
      console.log(e.target);
      this.props.navigate("/cart");
    };
    console.log(this.props);
    const onClickMinicart = (e) => {
      e.target.id !== "viewBag" && e.stopPropagation();
    };

    const onCheckOut = () => {
      this.props.dispatch(cartActions.checkOut())
    }

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
                prices={i.price}
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
              {this.props.cart.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className={styles.buttons}>
            <button id="viewBag" className={styles.viewBag} onClick={onViewBag}>
              view bag
            </button>
            <button className={styles.checkOut} onClick={onCheckOut}>check out</button>
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
