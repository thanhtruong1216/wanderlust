import React, { Component } from "react";
import styles from "./Day.module.sass";

class Day extends Component {
  render() {
    const { day } = this.props;
    return (
      <section>
        <h3>Date: {day.date} </h3>
        <div>Sunrise: {day.astro.sunrise}</div>
        <div>Sunset: {day.astro.sunset}</div>
      </section>
    );
  }
}
export default Day;
