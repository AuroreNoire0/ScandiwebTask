import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./ProductCard.module.css";
import greenCart from "../../../svg/greenCart.svg";
import { cartActions } from "../../../slices/cart-slice";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = { attributesSelected: {}, item: {}, curImage: 0, price: 0 };
  }
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.attributes);
    let attributesObject = {};
    console.log(attributesObject);
    this.props.product.attributes.length > 0 &&
      this.props.product.attributes.map(
        (attr) => (attributesObject[attr.id] = attr.items[0].id)
      );

    const price = this.props.product.prices.find(
      (cur) => cur.currency.label === this.props.currency.label
    );

    this.setState({
      item: this.props.product,
      attributesSelected: {
        ...this.state.attributesSelected,
        ...attributesObject,
      },
      price: price,
    });
  }
  componentDidUpdate() {
    const price = this.props.product.prices.find(
      (cur) => cur.currency.label === this.props.currency.label
    );
    this.state.price.currency.label !== this.props.currency.label &&
      this.setState({ ...this.state, price: price });
  }
  render() {
    const onClickProduct = (e) => {
      const clicked = e.target.closest("#cardContainer");
      this.props.navigate(`${clicked.dataset.id}`);
    };
    const onToggleGreenCart = (e) => {
      if (this.props.inStock) {
        const cartIcon = e.target
          .closest("#cardContainer")
          .querySelector(`.${styles.greenCartContainer}`);
        if (e.type === "mouseenter") {
          cartIcon.style.visibility = "visible";
        } else if (e.type === "mouseleave") {
          cartIcon.style.visibility = "hidden";
        } else return;
      } else return;
    };

    const onAddToCart = (e) => {
      e.stopPropagation();
      this.props.dispatch(
        cartActions.addToCart({
          product: this.state.item,
          attributesSelected: this.state.attributesSelected,
        })
      );
      localStorage.setItem("cart", JSON.stringify(this.props.cart));
    };

    return (
      <div
        id="cardContainer"
        className={styles.container}
        data-id={this.props.id}
        onClick={onClickProduct}
        onMouseEnter={onToggleGreenCart}
        onMouseLeave={onToggleGreenCart}
        
      >
        <div className={styles.image}>
          <img src={this.props.gallery[0]} alt="item" />
          {this.props.inStock && (
            <div className={styles.greenCartContainer} onClick={onAddToCart}>
              <img
                src={greenCart}
                alt="White cart icon on the green, circle background"
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {this.props.brand} {this.props.name}
          </div>
          <div className={styles.price}>
            {this.state.price.currency?.symbol}
            {this.state.price.amount}
          </div>
        </div>
        {!this.props.inStock && (
          <div className={styles.outOfStock}>out of stock</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(withRouter(ProductCard));
