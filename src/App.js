import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import styles from "./App.module.css";
import CategoryView from "./components/CategoryView/CategoryView";
import CartOverlay from "./components/CartOverlay";
import ProductView from "./components/ProductView/ProductView";
import CartView from "./components/Cart/CartView";

class App extends Component {
  constructor() {
    super();
    this.state = { openMinicart: false };
  }

  render() {
    const onToggleMinicart = () => {
      this.setState({ openMinicart: !this.state.openMinicart });
    };
    const onCloseMinicart = (e) => {
      this.state.openMinicart && this.setState({ openMinicart: false });
      
    };

    return (
      <div className={styles.container} onClick={onCloseMinicart}>
        <Header
          onToggleMinicart={onToggleMinicart}
          minicartVisible={this.state.openMinicart}
        />

        <div className={styles.content}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/all" />}
            ></Route>
            <Route path="/:category" element={<CategoryView />} />
            <Route path="/cart" element={<CartView />}></Route>
            <Route path="/:category/:id" element={<ProductView />}></Route>
          </Routes>
          {/* <CartView /> */}
          {this.state.openMinicart && (
            <CartOverlay onToggleMinicart={onToggleMinicart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;

// USE QUERY TAG instead of use query and import it like import { Query } from "@apollo/client/react/components";
