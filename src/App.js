import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import styles from "./App.module.css";
import CategoryView from "./components/CategoryView/CategoryView";
import CartOverlay from "./components/Minicart/CartOverlay";
import ProductView from "./components/ProductView/ProductView";
import CartView from "./components/CartView/CartView";
import { connect } from "react-redux";
import { currencyActions } from "./slices/currency-slice";

class App extends Component {
  constructor() {
    super();
    this.state = {
      openMinicart: false,
    };
  }

  render() {
    const onToggleMinicart = () => {
      this.setState({ openMinicart: !this.state.openMinicart });
    };
    const onCloseDropdowns = (e) => {
      this.state.openMinicart && this.setState({ openMinicart: false });
      this.props.currency.dropdown &&
        this.props.dispatch(currencyActions.toggleDropdown(false));
    };

    return (
      <div className={styles.container} onClick={onCloseDropdowns}>
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

          {this.state.openMinicart && (
            <CartOverlay onToggleMinicart={onToggleMinicart} />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(App);
