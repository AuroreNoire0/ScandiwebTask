import React from "react";
import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS_FROM_CATEGORY } from "../../../Queries/Queries";

export default class ProductList extends React.Component {
  render() {
    console.log(this.props.category);
    return (
      <div className={styles.wrapper}>
        <Query
          query={GET_PRODUCTS_FROM_CATEGORY}
          variables={{ title: this.props.category }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return console.log(error);
            return (
              console.log(data.category),
              data.category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  inStock={product.inStock}
                  brand={product.brand}
                  gallery={product.gallery}
                  prices={product.prices}
                  product={product}
                  attributes={product.attributes}
                />
              ))
            );
          }}
        </Query>
      </div>
    );
  }
}
