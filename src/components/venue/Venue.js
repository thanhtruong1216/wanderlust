import React, { Component } from "react";
import styles from "./Venue.module.sass";
class Venue extends Component {
  render() {
    const { venue } = this.props;
    return (
      <section className={styles.container}>
        <div>Name: {venue.venue.name}</div>
        <div>Address: {venue.venue.location.address}</div>
        <img
          src={`${venue.venue.categories[0].icon.prefix}bg_64${
            venue.venue.categories[0].icon.suffix
          }`}
          alt="venue-image"
        />
      </section>
    );
  }
}
export default Venue;
