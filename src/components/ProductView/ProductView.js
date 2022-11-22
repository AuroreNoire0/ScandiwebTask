import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { GET_PRODUCT_DETAILS } from "../../Queries/Queries";
import styles from "./ProductView.module.css";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductView extends Component {
  render() {
    let description = "";

    const onChooseColor = (e) => {
      const attributeContainer = e.target.closest(`div`);
      console.log(attributeContainer);
      console.log(attributeContainer.children);
    };
    return (
      <>
        <Query
          query={GET_PRODUCT_DETAILS}
          variables={{ id: this.props.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return console.log(error);
            return (
              console.log(data),
              (description = parse(data.product.description)),
              (
                <div className={styles.container}>
                  <div className={styles.miniaturesContainer}>
                    {data.product.gallery
                      ? data.product.gallery.map((img) => (
                          <div className={styles.miniature} key={img}>
                            {" "}
                            <img src={img} alt="product" />
                          </div>
                        ))
                      : null}
                  </div>
                  <div className={styles.content}>
                    <div className={styles.image}>
                      <img src={data.product.gallery[0]} alt="product" />
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
                                <div className={styles.colorBoxes}>
                                  {attribute.items
                                    ? attribute.items.map((item) => (
                                        <div
                                          key={item.value}
                                          className={`${styles.colorContainer} ${styles.activeColor}`}
                                          onClick={onChooseColor}
                                        >
                                          <div
                                            className={styles.colorBox}
                                            style={{
                                              backgroundColor: `${item.value}`,
                                            }}
                                          />
                                        </div>
                                      ))
                                    : null}
                                </div>
                              ) : (
                                <div className={styles.sizeBoxes}>
                                  {attribute.items
                                    ? attribute.items.map((item) => (
                                        <div
                                          className={styles.sizeBox}
                                          key={item.value}
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
                      <button className={styles.add}>add to cart</button>
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

export default withParams(ProductView);
