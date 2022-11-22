import React from "react";
import styles from "./CartItem.module.css";
import plus from "../../svg/plus.svg";
import plusMini from "../../svg/plusMini.svg";
import minus from "../../svg/minus.svg";
import minusMini from "../../svg/minusMini.svg";

export default class CartItem extends React.Component {
  render() {
    const minicart = this.props.minicart;
    const black = `#000000`;
    const red = `#dc0909`;
    const green = `#33a11a`;

    return (
      <div>
        <div className={minicart ? styles.containerMini : styles.container}>
          <div className={styles.info}>
            <div className={styles.nameContainer}>
              <div className={styles.name}>
                <span className={styles.brand}>Apollo</span>
                <span>Running Short</span>{" "}
              </div>
              <div className={styles.price}>$50.00</div>
            </div>
            <div className={styles.size}>
              <span>Size:</span>
              <div className={styles.sizeBoxes}>
                <div className={styles.sizeBox}>XS</div>
                <div className={styles.sizeBox}>S</div>
                <div className={styles.sizeBox}>M</div>
                <div className={styles.sizeBox}>L</div>
              </div>
            </div>
            <div className={styles.color}>
              <span>Color:</span>
              <div className={styles.colorBoxes}>
                <div
                  className={`${styles.colorContainer} ${styles.activeColor}`}
                >
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: black }}
                  />
                </div>
                <div className={styles.colorContainer}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: red }}
                  ></div>
                </div>
                <div className={styles.colorContainer}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: green }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.quantity}>
            <div className={styles.add}>
              <img src={minicart ? plusMini : plus} alt="plus" />
            </div>
            <div className={styles.number}> 1 </div>
            <div className={styles.remove}>
              <img src={minicart ? minusMini : minus} alt="minus" />
            </div>
          </div>
          <div className={styles.image}></div>
        </div>
        <div className={styles.separator}></div>
      </div>
    );
  }
}
