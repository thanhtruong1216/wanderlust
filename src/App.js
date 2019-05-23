import React, { Component } from "react";
import superagent from "superagent";
import styles from "./App.module.sass";
import Venues from "./components/venues/Venues";
import Days from "./components/days/Days";

const clientId = "FBEG21R2F3M5S1JSJOV0AZ52KUCPOQCFZQPJCCDFAQW3W4B4";
const clientSecret = "JDTQTTOYRVTQSP5ELBXF25BHQLTHITVDUF5JST4XARBCA0AL";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// APIXU Info
const apiKey = "134680bf827c4910b3685128191905";
const forecastUrl = "https://api.apixu.com/v1/forecast.json?key=";

class App extends Component {
  state = {
    text: "",
    venues: [],
    days: [],
    default: []
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleSearch = () => {
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${
      this.state.text
    }&days=4&hour=11`;

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

    try {
      superagent
        .get(urlWeatherToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          this.setState({
            days: response.body.forecast.forecastday
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const text = "Sai Gon";
    const urlToFetch = `${url}${text}&limit=4&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${text}&days=4&hour=11`;
    try {
      superagent
        .get(urlToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          console.log("data", response.body.response.groups[0].items);
          this.setState({
            default: response.body.response.groups[0].items
          });
        });
    } catch (error) {
      console.log(error);
    }

    try {
      superagent
        .get(urlWeatherToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          console.log('weather', response.body.forecast.forecastday)
          this.setState({
            days: response.body.forecast.forecastday
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.venues.length > 0) {
      return (
        <section className={styles.mainContainer}>
          <input onChange={this.handleChange} />
          <button onClick={this.handleSearch}>Submit</button>
          <h1>{this.state.text}</h1>
          <Days days={this.state.days} />
          <h1>{this.state.text}</h1>
          <Venues venues={this.state.venues} />
        </section>
      );
    } else {
      return (
        <section className={styles.mainContainer}>
          <input onChange={this.handleChange} />
          <button onClick={this.handleSearch}>Submit</button>
          <h1>Sai Gon's Waeather</h1>
          <Days days={this.state.days} />
          <h1>TOP ATTRACTIONS</h1>
          <Venues venues={this.state.default} />
        </section>
      );
    }
  }
}

export default App;
