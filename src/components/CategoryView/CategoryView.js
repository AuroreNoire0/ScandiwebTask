import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Title from "./Title";
import ProductList from "./Items/ProductList";

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
      <div>
        <Title category={this.state.curCategory} />
        <ProductList category={this.state.curCategory} />
      </div>
    );
  }
}

export default withParams(CategoryView);
