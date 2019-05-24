import React, { Component } from "react";
import styles from "./Day.module.sass";

class Day extends Component {
  render() {
    const { day } = this.props;
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return (
      <section className={styles.container}>
        <p>Sunrise: {day.astro.sunrise}</p>
        <p>Sunset: {day.astro.sunset}</p>
        <p>Min: {day.day.mintemp_c} &ordm;C</p>
        <p>Max: {day.day.maxtemp_c} &ordm;C</p>
        <p>UV: {day.day.uv}</p>
        <img src={`https://${day.day.condition.icon}`} alt="weather-icon" />
        <p>
          {weekDays[new Date(day.date).getDay()]} ({day.date})
        </p>
        <p>{day.day.condition.text}</p>
      </section>
    );
  }
}
export default Day;
