import React from "react";
import { connect } from "react-redux";
import { CURRENT_CATEGORY } from "../../constants";
import styles from "./NavigationLink.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

// import { Query } from "@apollo/client/react/components";
// import { GET_PRODUCTS_FROM_CATEGORY } from "../../Queries/Queries";

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
  render(props) {
    const label = `${this.props.label}`;
    // const onChooseCategory = () => {
    //   dispatch({ type: CURRENT_CATEGORY, payload: this.props.label });
    // };

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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCurrentCategory: () =>
//       dispatch({ type: CURRENT_CATEGORY, payload: this.props.label }),
//   };
// };
// export default connect(null, mapDispatchToProps)(NavigationLink);
export default withRouter(NavigationLink);
