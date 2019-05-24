import React, { Component } from "react";
import superagent from "superagent";
import styles from "./App.module.sass";
import Venues from "./components/venues/Venues";
import Days from "./components/days/Days";
import search from "./images/search-solid.svg";
import GoogleMap from "./components/GoogleMap";
import { apiKey, forecastUrl } from "./apiKeys/WeatherKeys";
import { clientId, clientSecret, url } from "./apiKeys/VenueKeys";

class App extends Component {
  state = {
    text: "",
    venues: [],
    days: [],
    defaultVenues: [],
    defaultDays: [],
    showMap: false,
    showSearchResultInMap: false,
    defaultLocations: [],
    defaultWeather: []
  };

  handleMapIfSearch = e => {
    this.setState({
      showSearchResultInMap: !this.state.showSearchResultInMap
    });
  };

  handleMap = e => {
    this.setState({
      showMap: !this.state.showMap
    });
    const text = "Sai Gon";
    const urlToFetch = `${url}${text}&limit=4&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${text}&days=4&hour=11`;
    try {
      superagent
        .get(urlToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          this.setState({
            defaultVenues: response.body.response.groups[0].items
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
          this.setState({
            defaultDays: response.body.forecast.forecastday
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  componentDidMount() {
    const text = "Sai Gon";
    const urlToFetch = `${url}${text}&limit=6&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${text}&days=6&hour=11`;
    debugger;
    try {
      superagent
        .get(urlToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          this.setState({
            defaultLocations: response.body.response.groups[0].items
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
          this.setState({
            defaultWeather: response.body.forecast.forecastday
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleSearch = e => {
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${
      this.state.text
    }&days=6&hour=11`;

    const urlToFetch = `${url}${
      this.state.text
    }&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    debugger;
    try {
      superagent
        .get(urlToFetch)
        .query(null)
        .set("Accept", "text/json")
        .end((error, response) => {
          let venuesResponse = response.body.response;
          this.setState({
            venues: venuesResponse.groups[0].items
          });
        });
    } catch (error) {
      this.setState({
        venues: this.state.defaultLocations
      });
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
      this.setState({
        days: this.state.defaultWeather
      });
    }
    e.preventDefault();
  };

  render() {
    let nodeMapDefault = null;
    const topContent = (
      <div>
        <header>
          <img
            src="https://s3.amazonaws.com/codecademy-content/courses/intermediate-javascript-requests/wanderlust/logo.svg"
            alt="logo"
          />
        </header>
        <main>
          <form>
            <h3>Where do you want to land?</h3>
            <div className={styles.inputGroup}>
              <input onChange={this.handleChange} />
              <button onClick={this.handleSearch} className={styles.searchIcon}>
                <img src={search} alt="search" />
              </button>
            </div>
          </form>
        </main>
      </div>
    );
    if (this.state.showMap) {
      nodeMapDefault = (
        <div>
          {topContent}
          <h1>Sai Gon Weather</h1>
          <Days days={this.state.defaultWeather} />
          <div className={styles.headerAttractions}>
            <h1>Sai Gon top attractions</h1>
            <button onClick={this.handleMap}>Hide map</button>
          </div>
          <GoogleMap locations={this.state.defaultVenues} />
        </div>
      );
    } else {
      nodeMapDefault = (
        <div>
          {topContent}
          <h1>Sai Gon Weather</h1>
          <Days days={this.state.defaultWeather} />
          <div className={styles.headerAttractions}>
            <h1>Sai Gon top attractions</h1>
            <button onClick={this.handleMap}>Show map</button>
          </div>
          <Venues venues={this.state.defaultLocations} />
        </div>
      );
    }

    let nodeMapIfSearch = null;
    if (this.state.showSearchResultInMap) {
      nodeMapIfSearch = (
        <div>
          {topContent}
          <h1>{this.state.text} Weather</h1>
          <Days days={this.state.days} />
          <div className={styles.headerAttractions}>
            <h1>{this.state.text} top attractions</h1>
            <button onClick={this.handleMapIfSearch}>Hide map</button>
          </div>
          <GoogleMap locations={this.state.venues} />
        </div>
      );
    } else {
      nodeMapIfSearch = (
        <div>
          {topContent}
          <h1>{this.state.text} Weather</h1>
          <Days days={this.state.days} />
          <div className={styles.headerAttractions}>
            <h1>{this.state.text} top attractions</h1>
            <button onClick={this.handleMapIfSearch}>Show map</button>
          </div>
          <Venues venues={this.state.venues} />
        </div>
      );
    }
    if (this.state.venues.length > 0 && this.state.days.length > 0) {
      return (
        <section className={styles.mainContainer}>{nodeMapIfSearch}</section>
      );
    } else {
      return (
        <section className={styles.mainContainer}>{nodeMapDefault}</section>
      );
    }
  }
}

export default App;
