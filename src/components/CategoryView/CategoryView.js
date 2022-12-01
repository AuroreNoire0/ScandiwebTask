import React, { Component } from "react";
import Title from "./Title";
import styles from "./CategoryView.module.css";
import ProductList from "./Items/ProductList";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class CategoryView extends Component {
  constructor() {
    super();
    this.state = { curCategory: "all" };
  }
  componentDidMount() {
    let { category } = this.props.params;
    this.setState({ curCategory: category });
  }

  componentDidUpdate(prevState) {
    if (prevState.params.category !== this.props.params.category) {
      this.setState({ curCategory: this.props.params.category });
    }
  }

  render() {
    return (
      <div className={styles.categoryView}>
        <Title category={this.state.curCategory} />
        <ProductList category={this.state.curCategory} />
      </div>
    );
  }
}

export default withParams(CategoryView);
