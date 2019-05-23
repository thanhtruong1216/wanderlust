import React, { Component } from "react";

class Venue extends Component {
  render() {
    const { venue } = this.props;
    return (
      <section>
        <div>{venue.venue.name}</div>
      </section>
    );
  }
}
export default Venue;
