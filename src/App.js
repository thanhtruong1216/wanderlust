import React, { Component } from "react";
import superagent from "superagent";
import "./App.sass";
import Venues from "./components/venues/Venues";

class App extends Component {
  state = {
    text: "",
    venues: []
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleSearch = () => {
    const clientId = "FBEG21R2F3M5S1JSJOV0AZ52KUCPOQCFZQPJCCDFAQW3W4B4";
    const clientSecret = "JDTQTTOYRVTQSP5ELBXF25BHQLTHITVDUF5JST4XARBCA0AL";
    const url = "https://api.foursquare.com/v2/venues/explore?near=";
    const urlToFetch = `${url}${
      this.state.text
    }&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    try {
      superagent
        .get(urlToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          let venuesResponse = response.body.response;
          this.setState({ venues: venuesResponse.groups[0].items });
          console.log(
            "venues",
            this.state.venues.map(v => console.log(v.venue))
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        hello
        <input onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Submit</button>
        <Venues venues={this.state.venues} />
      </div>
    );
  }
}

export default App;
