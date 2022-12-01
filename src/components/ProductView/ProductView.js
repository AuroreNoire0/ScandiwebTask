import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { GET_PRODUCT_DETAILS } from "../../Queries/Queries";
import styles from "./ProductView.module.css";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { cartActions } from "../../cart-slice";
import { connect } from "react-redux";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductView extends Component {
  constructor() {
    super();
    this.state = { attributesSelected: {}, item: {}, curImage: 0 };
  }

  render() {
    let description = "";
    const setDefault = (response) => {
      let attributesObject = {};
      response.product.attributes.length > 0 &&
        response.product.attributes.map(
          (attr) => (attributesObject[attr.id] = attr.items[0].id)
        );

      this.setState({
        item: response,
        attributesSelected: {
          ...this.state.attributesSelected,
          ...attributesObject,
        },
      });
    };
    const onAddToCart = () => {
      this.props.dispatch(
        cartActions.addToCart({
          product: this.state.item.product,
          attributesSelected: this.state.attributesSelected,
        })
      );
    };

    const onChooseAttribute = (e) => {
      const attributeContainer = e.target.closest("[data-typename]");
      const selected =
        attributeContainer.id === "Color"
          ? e.target.closest(`.${styles.colorContainer}`)
          : e.target;

      [...attributeContainer.children].forEach((element) => {
        element.classList.remove(`${styles.active}`);
      });
      selected.classList.add(`${styles.active}`);
      this.setState({
        attributesSelected: {
          ...this.state.attributesSelected,
          [attributeContainer.id]: selected.id,
        },
      });
    };

    const onChangeImage = (e) => {
      const image = e.target.closest(`.${styles.miniature}`).id;
      this.setState({ curImage: image });
    };

    return (
      <>
        <Query
          query={GET_PRODUCT_DETAILS}
          variables={{ id: this.props.params.id }}
          onCompleted={(response) => setDefault(response)}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return console.log(error);
            return (
              // console.log(data),
              (description = parse(data.product.description)),
              (
                <div className={styles.container}>
                  <div className={styles.miniaturesContainer}>
                    {data.product.gallery
                      ? data.product.gallery.map((img, i) => (
                          <div
                            className={styles.miniature}
                            key={img}
                            id={i}
                            onClick={onChangeImage}
                          >
                            {" "}
                            <img src={img} alt="product" />
                          </div>
                        ))
                      : null}
                  </div>
                  <div className={styles.content}>
                    <div className={styles.image}>
                      <img
                        src={data.product.gallery[this.state.curImage]}
                        alt="product"
                      />
                      {!data.product.inStock && (
                        <div className={styles.outOfStock}>out of stock</div>
                      )}
                    </div>
                    <div className={styles.info}>
                      <div className={styles.title}>
                        <div className={styles.brand}>{data.product.brand}</div>
                        <div className={styles.name}>{data.product.name} </div>
                      </div>
                      {data.product.attributes
                        ? data.product.attributes.map((attribute) => (
                            <div
                              key={attribute.id}
                              id={attribute.id}
                              className={styles.attribute}
                            >
                              <span>{attribute.name}:</span>
                              {attribute.type === "swatch" ? (
                                <div
                                  className={styles.colorBoxes}
                                  data-typename={attribute.__typename}
                                  id={attribute.id}
                                >
                                  {attribute.items
                                    ? attribute.items.map((item) => (
                                        <div
                                          key={item.value}
                                          className={styles.colorContainer}
                                          onClick={onChooseAttribute}
                                          id={item.id}
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
                                  id={attribute.id}
                                >
                                  {attribute.items
                                    ? attribute.items.map((item) => (
                                        <div
                                          className={styles.sizeBox}
                                          key={item.value}
                                          onClick={onChooseAttribute}
                                          id={item.id}
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
                      <div className={styles.price}>
                        <span>price:</span>
                        <span className={styles.priceValue}>
                          {data.product.prices[0].amount}{" "}
                          {data.product.prices[0].currency.symbol}
                        </span>
                      </div>
                      <button
                        className={styles.add}
                        onClick={onAddToCart}
                        disabled={!data.product.inStock}
                      >
                        add to cart
                      </button>
                      <div className={styles.description}>{description}</div>
                    </div>
                  </div>
                </div>
              )
            );
          }}
        </Query>
      </>
    );
  }
}

export default connect()(withParams(ProductView));
