import React, { Component } from "react";
import styles from "./Venue.module.sass";
class Venue extends Component {
  render() {
    const { venue } = this.props;
    return (
      <section className={styles.container}>
        <img
          src={`${venue.venue.categories[0].icon.prefix}bg_64${
            venue.venue.categories[0].icon.suffix
          }`}
          alt="venue-image"
        />
        <p>{venue.venue.name}</p>
        <p>{venue.venue.location.address}</p>
        <p>{venue.venue.location.city}</p>
        <p>{venue.venue.location.country}</p>
      </section>
    );
  }
}
export default Venue;
