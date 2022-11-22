import React, { Component } from "react";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";

import axios from "axios";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

import { gql } from "@apollo/client";
import CategoryView from "./components/CategoryView/CategoryView";
import CartOverlay from "./components/CartOverlay";
import ProductView from "./components/ProductView/ProductView";
import CartView from "./components/Cart/CartView";
import { GET_CATEGORIES } from "./Queries/Queries";

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />

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

          {/* <ProductView /> */}
          {/* <CartView /> */}
          {/* <CartOverlay /> */}
        </div>
      </div>
    );
  }
}

export default App;

// USE QUERY TAG instead of use query and import it like import { Query } from "@apollo/client/react/components";
