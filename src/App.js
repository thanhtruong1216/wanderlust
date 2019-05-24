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
    const urlToFetch = `${url}${text}&limit=4&client_id=${clientId}&client_secret=${clientSecret}&v=20190519`;
    const urlWeatherToFetch = `${forecastUrl}${apiKey}&q=${text}&days=4&hour=11`;
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
    this.setState({
      defaultVenues: []
    });
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
          this.setState({
            venues: venuesResponse.groups[0].items
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
            days: response.body.forecast.forecastday
          });
        });
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  render() {
    let nodeMapDefault = null;
    let btnText = "";
    if (this.state.showMap) {
      nodeMapDefault = <GoogleMap locations={this.state.defaultVenues} />;
      btnText = <button onClick={this.handleMap}>Hide map</button>;
    } else {
      nodeMapDefault = <button onClick={this.handleMap}>Show map</button>;
    }

    let nodeMapIfSearch = null;
    if (this.state.showSearchResultInMap) {
      nodeMapIfSearch = <GoogleMap locations={this.state.venues} />;
      btnText = <button onClick={this.handleMapIfSearch}>Hide map</button>;
    } else {
      nodeMapIfSearch = (
        <button onClick={this.handleMapIfSearch}>Show map</button>
      );
    }

    const topContent = (
      <div>
        <header>
          <img
            class="logo"
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
    if (this.state.venues.length > 0 && this.state.days.length > 0) {
      return (
        <section className={styles.mainContainer}>
          {topContent}
          <h1>Weather</h1>
          <Days days={this.state.days} />
          <h1>TOP ATTRACTIONS</h1>
          <Venues venues={this.state.venues} />
          {btnText}
          {nodeMapIfSearch}
        </section>
      );
    } else {
      return (
        <section className={styles.mainContainer}>
          {topContent}
          <h1>Weather</h1>
          <Days days={this.state.defaultDays} />
          <h1>TOP ATTRACTIONS</h1>
          <Venues venues={this.state.defaultLocations} />
          {btnText}
          {nodeMapDefault}
        </section>
      );
    }
  }
}

export default App;
