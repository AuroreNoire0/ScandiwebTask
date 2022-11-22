import React from "react";
import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";
import { Query } from "@apollo/client/react/components";
import {
  GET_CATEGORIES,
  GET_PRODUCTS_FROM_CATEGORY,
} from "../../../Queries/Queries";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default class ProductList extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { curCategory: "all" };
  // }
  // componentDidMount() {
  //   let { category } = this.props.params;
  //   this.setState({ curCategory: category });
  // }

  render(props) {
    return (
      <div className={styles.wrapper}>
        <Query
          query={GET_PRODUCTS_FROM_CATEGORY}
          variables={{ title: this.props.category }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return console.log(error);
            return data.category.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                inStock={product.inStock}
                brand={product.brand}
                gallery={product.gallery}
                prices={product.prices}
              />
            ));
          }}
        </Query>
      </div>
    );
  }
}
