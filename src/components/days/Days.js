import React, { Component } from "react";
import Day from "../day/Day";

class Days extends Component {
  render() {
    const { days } = this.props;
    return (
      <section>
        {days.map((day, index) => {
          return <Day key={index} day={day} />;
        })}
      </section>
    );
  }
}
export default Days;
