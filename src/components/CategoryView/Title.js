import React from "react";
import styles from "./Title.module.css";
export default class Title extends React.Component {
  render() {
    const catName =
      this.props.category[0].toUpperCase() + this.props.category.slice(1);
    return (
      <div className={styles.title}>
        <h2>{catName}</h2>
      </div>
    );
  }
}
