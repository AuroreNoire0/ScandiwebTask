import React from "react";
import { connect } from "react-redux";
import plus from "../../svg/plus.svg";
import plusMini from "../../svg/plusMini.svg";
import minus from "../../svg/minus.svg";
import minusMini from "../../svg/minusMini.svg";
import arrowLeft from "../../svg/arrowLeft.svg";
import arrowRight from "../../svg/arrowRight.svg";
import { cartActions } from "../../slices/cart-slice";
import styles from "./CartItem.module.css";

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0, price: 0 };
  }
  componentDidMount() {
    const idCart = this.props.minicart ? "minicart" : "mainCart";
    const showSelectedAttributes = () => {
      for (const [key, value] of Object.entries(
        this.props.attributesSelected
      )) {
        const attribute = document
          .getElementById(`${idCart}`)
          .querySelector(`.${this.props.className}`)
          .querySelector(`#${key.replace(/\s+/g, "")}`);

        const trimedValue = value.replace(/\s+/g, "");
        const selected = attribute.querySelector(`[id="${trimedValue}"]`);
        selected.classList.add(`${styles.active}`);
      }
    };

    showSelectedAttributes();
    const price = this.props.prices.find(
      (cur) => cur.currency.label === this.props.currency.label
    );

    this.setState({
      price: price,
    });
  }

  componentDidUpdate() {
    const price = this.props.prices.find(
      (cur) => cur.currency.label === this.props.currency.label
    );
    this.state.price.currency.label !== this.props.currency.label &&
      this.setState({ ...this.state, price: price });
  }

  render() {
    const onPreviousImage = () => {
      this.state.currentImage === 0
        ? this.setState({ currentImage: this.props.gallery.length - 1 })
        : this.setState({ currentImage: this.state.currentImage - 1 });
    };

    const onNextImage = () => {
      this.state.currentImage === this.props.gallery.length - 1
        ? this.setState({ currentImage: 0 })
        : this.setState({ currentImage: this.state.currentImage + 1 });
    };
    const onAddToCart = (e) => {
      e.stopPropagation();
      this.props.dispatch(
        cartActions.addToCart({
          product: this.props.item,
          attributesSelected: this.props.attributesSelected,
        })
      );
    };
    const onRemoveFromCart = () => {
      this.props.dispatch(
        cartActions.removeFromCart({
          product: this.props.item,
          attributesSelected: this.props.attributesSelected,
        })
      );
    };
    return (
      <div className={this.props.className}>
        <div
          className={
            this.props.minicart ? styles.containerMini : styles.container
          }
          id="cart"
        >
          <div className={styles.info}>
            <div className={styles.nameContainer}>
              <div className={styles.name}>
                <span className={styles.brand}>{this.props.brand}</span>
                <span>{this.props.name}</span>{" "}
              </div>
              <div className={styles.price}>
                {this.props.currency.symbol}
                {this.state.price.amount}
              </div>
            </div>

            {this.props.attributes
              ? this.props.attributes.map((attribute) => (
                  <div
                    key={attribute.id}
                    id={attribute.id.replace(/\s+/g, "")}
                    className={styles.attribute}
                  >
                    <span>{attribute.name}:</span>
                    {attribute.type === "swatch" ? (
                      <div
                        className={styles.colorBoxes}
                        data-typename={attribute.__typename}
                        id={attribute.id.replace(/\s+/g, "")}
                      >
                        {attribute.items
                          ? attribute.items.map((item) => (
                              <div
                                key={item.value}
                                className={styles.colorContainer}
                                id={item.id.replace(/\s+/g, "")}
                              >
                                <div
                                  className={
                                    item.id !== "White"
                                      ? `${styles.colorBox}`
                                      : `${styles.colorBoxWhite}`
                                  }
                                  style={{
                                    backgroundColor: `${item.value}`,
                                  }}
                                />
                              </div>
                            ))
                          : null}
                      </div>
                    ) : (
                      <div
                        className={styles.sizeBoxes}
                        data-typename={attribute.__typename}
                        id={attribute.id.replace(/\s+/g, "")}
                      >
                        {attribute.items
                          ? attribute.items.map((item) => (
                              <div
                                className={styles.sizeBox}
                                key={item.value}
                                id={item.id.replace(/\s+/g, "")}
                              >
                                {item.value}
                              </div>
                            ))
                          : null}
                      </div>
                    )}
                  </div>
                ))
              : null}
          </div>
          <div className={styles.quantity}>
            <div className={styles.add} onClick={onAddToCart}>
              <img src={this.props.minicart ? plusMini : plus} alt="plus" />
            </div>
            <div className={styles.number}> {this.props.quantity} </div>
            <div className={styles.remove} onClick={onRemoveFromCart}>
              <img src={this.props.minicart ? minusMini : minus} alt="minus" />
            </div>
          </div>
          <div className={styles.image}>
            <img
              src={this.props.gallery[`${this.state.currentImage}`]}
              alt="item"
            />
            {this.props.gallery.length > 1 && (
              <div className={styles.arrows}>
                <div
                  className={styles.arrowContainer}
                  onClick={onPreviousImage}
                >
                  <img src={arrowLeft} alt="arrow left" />
                </div>
                <div className={styles.arrowContainer} onClick={onNextImage}>
                  <img src={arrowRight} alt="arrow right" />
                </div>
              </div>
            )}
          </div>
        </div>
        {!this.props.minicart && <div className={styles.separator}></div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(CartItem);
