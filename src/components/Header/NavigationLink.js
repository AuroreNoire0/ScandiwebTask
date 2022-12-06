import React from "react";
import styles from "./NavigationLink.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

class NavigationLink extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
  render() {
    const label = `${this.props.label}`;
    const onClickCategory = (e) => {
      e.preventDefault();
      this.props.navigate(`/${e.target.name}`);
    };

    return (
      <div>
        <NavLink
          to={label}
          name={label}
          onClick={onClickCategory}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
          }
        >
          {label}
        </NavLink>
      </div>
    );
  }
}

export default withRouter(NavigationLink);
