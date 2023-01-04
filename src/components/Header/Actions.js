import React from "react";
import { connect } from "react-redux";
import miniCart from "../../svg/miniCart.svg";
import arrowDown from "../../svg/arrowDown.svg";
import arrowUp from "../../svg/arrowUp.svg";
import { GET_CURRENCIES } from "../../Queries/Queries";
import { Query } from "@apollo/client/react/components";
import { currencyActions } from "../../slices/currency-slice";
import styles from "./Actions.module.css";

class Actions extends React.Component {
  constructor() {
    super();
    this.state = { selectCurrency: false };
  }

  render() {
    const onToggleDropdown = () => {
      this.props.dispatch(
        currencyActions.toggleDropdown(!this.props.currency.dropdown)
      );
    };

    const onSelectCurrency = (e) => {
      this.props.dispatch(
        currencyActions.changeCurrency({
          label: e.target.id,
          symbol: e.target.dataset["symbol"],
        })
      );
      localStorage.setItem(
        "currency",
        JSON.stringify({
          label: e.target.id,
          symbol: e.target.dataset["symbol"],
        })
      );
      onToggleDropdown();
    };
    return (
      <div className={styles.container}>
        <div className={styles.actions}>
          <div className={styles.currencies} onClick={onToggleDropdown}>
            <div>{this.props.currency.symbol}</div>
            <img
              src={this.props.currency.dropdown ? arrowUp : arrowDown}
              alt="Arrow to open or close select currency window."
            />
          </div>
          <div id="minicartIcon" className={styles.minicartIcon}>
            <img
              src={miniCart}
              alt="Minicart icon"
              onClick={this.props.onToggleMinicart}
            />
            {this.props.cart.totalQuantity > 0 && (
              <div className={styles.minicartBadge}>
                {this.props.cart.totalQuantity}
              </div>
            )}
          </div>
        </div>
        {this.props.currency.dropdown && (
          <div className={styles.currencyList}>
            <Query query={GET_CURRENCIES}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;
                return data.currencies.map((cur) => (
                  <div
                    key={cur.label}
                    className={
                      cur.symbol === this.props.currency.symbol
                        ? `${styles.currencyItem} ${styles.active}`
                        : `${styles.currencyItem}`
                    }
                    id={cur.label}
                    data-symbol={cur.symbol}
                    onClick={onSelectCurrency}
                  >
                    {" "}
                    {cur.symbol} {cur.label}
                  </div>
                ));
              }}
            </Query>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currency: state.currency };
}

export default connect(mapStateToProps)(Actions);
