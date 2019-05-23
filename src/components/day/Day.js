import React, { Component } from "react";
import styles from "./Day.module.sass";

class Day extends Component {
  render() {
    const { day } = this.props;
    return (
      <section className={styles.container}>
        <div>Sunrise: {day.astro.sunrise}</div>
        <div>Sunset: {day.astro.sunset}</div>
        <div>Min: {day.day.mintemp_c} &ordm;C</div>
        <div>Max: {day.day.maxtemp_c} &ordm;C</div>
        <div>UV: {day.day.uv}</div>
        <img src={`https://${day.day.condition.icon}`} />
        <h3>Date: {day.date} </h3>
        <p>{day.day.condition.text}</p>
      </section>
    );
  }
}
export default Day;
