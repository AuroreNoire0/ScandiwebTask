import React from "react";
import styles from "./ProductCard.module.css";
import image from "../../../img/pexels-pixabay-556414.jpg";
import { useNavigate } from "react-router-dom";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
class ProductCard extends React.Component {
  render() {
    const onClickProduct = (e) => {
      const clicked = e.target.closest("#cardContainer");
      this.props.navigate(`${clicked.dataset.id}`);
    };

    return (
      <div
        id="cardContainer"
        className={styles.container}
        data-id={this.props.id}
        onClick={onClickProduct}
      >
        <div className={styles.image}>
          <img src={this.props.gallery[0]} alt="item" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {this.props.brand} {this.props.name}
          </div>
          <div className={styles.price}>
            {this.props.prices[0].amount} {this.props.prices[0].currency.symbol}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductCard);
