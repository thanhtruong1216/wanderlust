import React, { Component } from "react";
// import "../App.sass";
import styles from "./StylesMap";
import "./Map.sass";
import data from "./Data";
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.mapDom = React.createRef();
    this.state = {
      //   {
      //     id: 1,
      //     title: "I studied here for four years(2009-2013)",
      //     image:
      //       "http://imgs.vietnamnet.vn/Images/2017/08/24/07/20170824075752-can-tho.jpg",
      //     address: "3/2 Street, Ninh Kieu District, Can Tho City",
      //     location: {
      //       lat: 10.030999,
      //       lng: 105.76879
      //     }
      //   },
      //   {
      //     id: 2,
      //     title: "I live here currently",
      //     image:
      //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWdxwl7wcQZoboWYr-u4O_xKry6ajsSX_T0Fk6Esh6YCwhMCI5",
      //     address: "Nguyen Huu Tho Street, District 7, Ho Chi Minh City",
      //     location: {
      //       lat: 10.758334,
      //       lng: 106.672211
      //     }
      //   },
      //   {
      //     id: 3,
      //     title: "I worked here for three years(2013-2016)",
      //     image:
      //       "http://kgtv.vn/wp-content/uploads/2015/07/dai-ptva-th-ghep-may-2015.jpg",
      //     address: "39 Dong Da Street, District Vinh Lac, Rach Gia City",
      //     location: {
      //       lat: 9.994949,
      //       lng: 105.095413
      //     }
      //   }
      // ],
      largeInfowindow: null
    };
  }

  componentDidMount() {
    let interval;
    interval = setInterval(() => {
      /* global google */
      if (
        typeof google !== "undefined" &&
        typeof google.maps !== "undefined" &&
        typeof google.maps.Map !== "undefined"
      ) {
        clearInterval(interval);
        this.initMap();
      }
    }, 1500);
  }

  initMap() {
    let mapConfigs = {
      center: { lat: 10.758334, lng: 106.672211 },
      zoom: 9,
      maxZoom: 15,
      minZoom: 6,
      styles: styles,
      mapTypeControl: false
    };
    let mapDom = document.getElementById("map");
    this.bounds = new google.maps.LatLngBounds();
    this.map = new google.maps.Map(mapDom, mapConfigs);
    this.setState({ largeInfowindow: new google.maps.InfoWindow() });
    function makeMarkerIcon(markerColor) {
      let markerImage = new google.maps.MarkerImage(
        "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" +
          markerColor +
          "|40|_|%E2%80%A2",
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34)
      );
      return markerImage;
    }
    let defaultIcon = makeMarkerIcon("0091ff");
    let highlightedIcon = makeMarkerIcon("FFFF24");
    for (let i = 0; i < this.props.locations.length; i++) {
      let location = this.props.locations[i];
      let lat = location.venue.location.lat;
      let lng = location.venue.location.lng;
      let position = { lat: lat, lng: lng };
      let title = location.title;
      let image = location.image;
      let address = location.venue.location.address;
      let marker = new google.maps.Marker({
        map: this.map,
        position: position,
        // title: title,
        icon: defaultIcon,
        // animation: google.maps.Animation.DROP,
        // image: image,
        address: address
      });
      marker.addListener("click", () => {
        this.populateInfoWindow(marker, this.state.largeInfowindow);
      });
      marker.addListener("mouseover", function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener("mouseout", function() {
        this.setIcon(defaultIcon);
      });
    }
  }
  // Create info window content and check type of data to decide what imformation will show.
  populateInfoWindow = marker => {
    let infowindow = this.state.largeInfowindow;
    infowindow.marker = marker;
    infowindow.setContent(`
        <div class="info-window-container">
          <img class="marker-image" src=${marker.image} alt=${marker.title}/>
          <h3>${marker.title}</h3>
          <p>${marker.address}</p>
        </div>
      `);
    infowindow.open(this.map, marker);
    infowindow.addListener("click", () => {
      infowindow.close();
    });
  };

  // Show info window when click on the name of the location
  showInfowindowForLocation = location => {
    this.populateInfoWindow(this.markers[location.id]);
  };

  render() {
    return (
      <section className="page-container">
        <div className="map" id="map" />
      </section>
    );
  }
}

export default GoogleMap;
