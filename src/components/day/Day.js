import React, { Component } from "react";
import styles from "./Day.module.sass";

class Day extends Component {
  render() {
    const { day } = this.props;
    return (
      <section className={styles.container}>
        <p>Sunrise: {day.astro.sunrise}</p>
        <p>Sunset: {day.astro.sunset}</p>
        <p>Min: {day.day.mintemp_c} &ordm;C</p>
        <p>Max: {day.day.maxtemp_c} &ordm;C</p>
        <p>UV: {day.day.uv}</p>
        <img src={`https://${day.day.condition.icon}`} />
        <h3>Date: {day.date} </h3>
        <p>{day.day.condition.text}</p>
      </section>
    );
  }
}
export default Day;
