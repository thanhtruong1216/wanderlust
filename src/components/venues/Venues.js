import React, { Component } from "react";
import Venue from "../venue/Venue";
import styles from "./Venues.module.sass";

class Venues extends Component {
  render() {
    const { venues } = this.props;
    return (
      <section className={styles.container}>
        {venues.map((venue, index) => {
          return <Venue key={index} venue={venue} />;
        })}
      </section>
    );
  }
}
export default Venues;
