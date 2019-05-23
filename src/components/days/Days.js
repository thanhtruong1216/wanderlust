import React, { Component } from "react";
import Day from "../day/Day";
import styles from "./Days.module.sass";

class Days extends Component {
  render() {
    const { days } = this.props;
    return (
      <section className={styles.container}>
        {days.map((day, index) => {
          return <Day key={index} day={day} />;
        })}
      </section>
    );
  }
}
export default Days;
