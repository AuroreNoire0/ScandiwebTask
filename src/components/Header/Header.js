import React from "react";
import styles from "./Header.module.css";
import Navigation from "./Navigation";
import logo from "../../svg/logo.svg";
import Actions from "./Actions";

export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <Navigation />
        <img src={logo} alt="Logo, brand icon." />
        <Actions />
      </div>
    );
  }
}
