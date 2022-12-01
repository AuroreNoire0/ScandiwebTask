import React from "react";
import styles from "./ProductCard.module.css";
import greenCart from "../../../svg/greenCart.svg";
import image from "../../../img/pexels-pixabay-556414.jpg";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../../cart-slice";
import { connect } from "react-redux";

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
    this.state = { attributesSelected: {}, item: {}, curImage: 0 };
  }
  componentDidMount() {
    let attributesObject = {};
    // this.setState({ item: this.props.product });
    this.props.product.attributes.length > 0 &&
      this.props.product.attributes.map(
        (attr) => (attributesObject[attr.id] = attr.items[0].id)
      );

    this.setState({
      item: this.props.product,
      attributesSelected: {
        ...this.state.attributesSelected,
        ...attributesObject,
      },
    });
    // console.log(this.props.product);
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
            {this.props.prices[0].amount} {this.props.prices[0].currency.symbol}
          </div>
        </div>
        {!this.props.inStock && (
          <div className={styles.outOfStock}>out of stock</div>
        )}
      </div>
    );
  }
}

export default connect()(withRouter(ProductCard));
