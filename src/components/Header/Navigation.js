import React from "react";
import styles from "./Navigation.module.css";
import NavigationLink from "./NavigationLink";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../Queries/Queries";

export default class Navigation extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  render() {
    const removeActiveClass = (e) => {
      console.log("remove");
      e.target.classList.remove(`${styles.active}`);
    };
    return (
      <div className={styles.navigation}>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            return data.categories.map((category) => (
              <NavigationLink
                key={category.name}
                label={category.name}
                onClick={removeActiveClass}
              />
            ));
          }}
        </Query>
      </div>
    );
  }
}
