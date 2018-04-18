import React, {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './branding/Footer';
import Display from './Display';
import Header from './branding/Header';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);

    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateMapType = this.updateMapType.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.checkSQL = this.checkSQL.bind(this);
    this.addToTrip = this.addToTrip.bind(this);
    this.isInTrip = this.isInTrip.bind(this);
    this.addAllToTrip = this.addAllToTrip.bind(this);
    this.plan = this.plan.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.setNewStart = this.setNewStart.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.state = {
      loading: false,
      trip: {},
      query: {},
      config: {},
      size: {
        header: 0,
        content: 0,
        footer: 0
      }
    };

    this.queryPlaces = {};
    this.tffiVersion = 1;

  }

  // DONT TOUCH OR YOU DIE
  componentWillMount() {
    // Put app into loading state
    this.setState({loading: true});

    // load until server gives us it's configuration
    this.requestConfig()
    .then((data) => {
      this.state.trip = this.getDefaultTrip(data);
      this.state.query = this.getDefaultQuery(data);
      this.state.config = data;
      this.tffiVersion = data.version;

      // now that we have server info, set state accordingly and exit loading
      this.setState({
        loading: false,
        trip: this.state.trip,
        query: this.state.query,
        config: this.state.config
      });
    });
  }

  updateSize(size) {
    console.log("size", size);
    let currentSize = Object.assign({}, this.state.size);
    console.log("cur size", currentSize);

    Object.assign(currentSize, size);
    console.log("cur size 2", currentSize);
    this.setState({size: currentSize});
  }

  //populate with search
  updateQuery(searchTFFI) {
    let copyTFFI = Object.assign(this.getDefaultQuery(this.state.config),
        this.state.query);

    Object.assign(copyTFFI, searchTFFI);
    let nextTFFI = {
      version: copyTFFI.version,
      type: copyTFFI.type,
      query: copyTFFI.query,
      places: copyTFFI.places,
      filters: copyTFFI.filters
    };

    this.setState({query: nextTFFI});
  }

  checkSQL(query) {
    this.state.query.query = this.escapeRegExp(query);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getDefaultTrip(serverConfig) {
    let t = {
      version: serverConfig.version,
      type: "trip",
      title: "Untitled Trip",
      options: {
        distance: this.miles(),
        userUnit: "",
        userRadius: "",
        optimization: "0",
        map: serverConfig.maps.includes("kml") ? "kml" : "svg"
      },
      places: [],
      distances: [],
      map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
    };

    return t;
  }

  getDefaultQuery(serverConfig) {
    let t = {
      version: serverConfig.version,
      type: "query",
      query: "",
      filters: [],
      places: []
    };
    return t;
  }

  getDefaultConfig() {
    let t = {
      type: "config",
      version: 3,
      filters: [],
      maps: ["svg"],
      optimization: 0,
      optimizations: [],
      units: [
        "miles"
      ]
    };
    return t;
  }

  async requestConfig() {
    let configRequest = {};

    //try to get configuration from server
    try {
      configRequest = await fetch(process.env.SERVICE_URL + '/config', {
        method: "GET"
      });
    } catch (err) {
      console.log(
          "No configuration response from server, assuming server version 1.0");
      console.error(err);
      configRequest = this.getDefaultConfig();
      configRequest.version = 1;

      return configRequest;
    }

    let ret = await configRequest.json();
    console.log("Server version " + ret.version);
    console.log("Filters " + ret.filters.length);
    return ret;
  }

  updateTrip(tffi) {
    console.log("hey", this.state.config);
    console.log("defaulttrip, ", this.getDefaultTrip(this.state.config));

    let copyTFFI = Object.assign(this.getDefaultTrip(this.state.config),
        this.state.trip);
    Object.assign(copyTFFI, tffi);
    console.log("copyTFFI, ", copyTFFI);

    let nextTFFI = {
      version: copyTFFI.version,
      type: copyTFFI.type,
      title: copyTFFI.title,
      options: {
        distance: copyTFFI.options.distance,
        userUnit: copyTFFI.options.userUnit,
        userRadius: copyTFFI.options.userRadius,
        optimization: copyTFFI.options.optimization,
        map: copyTFFI.options.map
      },
      places: copyTFFI.places,
      distances: copyTFFI.distances,
      map: copyTFFI.map
    };

    console.log("nextTFFI, ", nextTFFI);

    nextTFFI = this.checkOptionsV1(nextTFFI, tffi);

    this.setState({trip: nextTFFI});
  }

  checkOptionsV1(nextTFFI, incomingTFFI) {

    if (!nextTFFI.options.distance) {
      //Check if incoming tffi is v1
      if (incomingTFFI.options.name === "kilometers") {
        nextTFFI.options.distance = this.kilometers();
      } else if (incomingTFFI.options.name === "miles") {
        nextTFFI.options.distance = this.miles();
      } else {
        nextTFFI.options.distance = this.miles();
      }
    }

    // Set optimization if undefined (likely caused by a v1 file).
    if (!nextTFFI.options.optimization) {
      nextTFFI.options.optimization = this.state.trip.options.optimization;
    }

    return nextTFFI;
  }

  miles() {
    return "miles";
  }

  kilometers() {
    return "kilometers";
  }

  updateOptions(options) {
    if (options === "kilometers") {
      this.state.trip.options.distance = this.kilometers();
    } else if (options === "miles") {
      this.state.trip.options.distance = this.miles();
    }
    if (options >= 0 && options <= 1) {
      this.state.trip.options.optimization = options;
    }
    this.plan();
  }

  updateMapType(mapType) {
    if (mapType == "kml" && this.state.config.maps.includes("kml")) {
      this.state.trip.options.map = "kml";
    } else {
      this.state.trip.options.map = "svg";
    }
    this.plan();
  }

  isInTrip(id) {
    for (let i = 0; i < this.state.trip.places.length; ++i) {
      if (this.state.trip.places[i].id == id) {
        return true;
      }
    }
  }

  addAllToTrip() {
    for (var place in this.queryPlaces) {
      this.state.trip.places.push(this.queryPlaces[place]);
    }
    this.queryPlaces = {};
    this.setState({trip: this.state.trip})
    this.plan();
  }

  addToTrip(place) {
    if (!this.isInTrip(place.id)) {
      this.state.trip.places.push(place);
      delete this.queryPlaces[place.id];
    }
    this.setState({trip: this.state.trip})
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    console.log(process.env.SERVICE_URL);
    console.log("POSTing: " + this.state.trip);
    return fetch(process.env.SERVICE_URL + '/plan', {
      method:"POST",
      body: JSON.stringify(this.state.trip)
    });
  }

  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      if(tffi.code == "500"){
        alert(tffi.message);
      }else{
        this.updateTrip(tffi);
      }
    } catch(err) {
      console.error(err);
    }
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI(){
    //Create saver object and contents
    var Saver = require('file-saver');
    var blob = new Blob([JSON.stringify(this.state.trip)], {type: "text/plain;charset=utf-8"});

    //Create title
    var title = this.state.trip.title;
    if (title === "") {
      title = "Trip.json"
    } else {
      title += ".json";
    }

    //Save file
    Saver.saveAs(blob, title);
  }

  reverseTrip() {
    let places = this.state.trip.places;
    let distances = this.state.trip.distances;
    let newState = {
      places: places.reverse(),
      distances: distances.reverse()
    };
    this.updateTrip(newState);
  }

  setNewStart(index) {

    let distancesCopy = Application.reorder(this.state.trip.distances, index);
    let placesCopy = Application.reorder(this.state.trip.places, index);

    let newState = {
      places: placesCopy,
      distances: distancesCopy
    };

    this.updateTrip(newState);
  }

  static reorder(array, index) {
    if (index < 0 || index >= array.length) {
      return array;
    }

    return array.slice(index).concat(array.slice(0, index));
  }

  render() {
    if (this.state.loading == true) {
      return <h2>LOADING...</h2>;
    }

    return (
        <div id="application" style={{maxHeight: "100%"}}>
          <Header updateSize={this.updateSize}/>
          <div className="row" style={{maxHeight: "100%"}}>
            <Sidebar plan={this.plan}
                     saveTFFI={this.saveTFFI}
                     reverseTrip={this.reverseTrip}
                     setNewStart={this.setNewStart}
                     updateOptions={this.updateOptions}
                     updateMapType={this.updateMapType}
                     trip={this.state.trip}
                     updateTrip={this.updateTrip}
                     query={this.state.query}
                     config={this.state.config}
                     updateQuery={this.updateQuery}
                     checkSQL={this.checkSQL}
                     addToTrip={this.addToTrip}
                     isInTrip={this.isInTrip}
                     addAllToTrip={this.addAllToTrip}
                     queryPlaces={this.queryPlaces}
            />
            <Display trip={this.state.trip}
                     setNewStart={this.setNewStart}/>
          </div>
          <Footer number={this.props.number} name={this.props.name}/>
        </div>
    );
  }
}

export default Application;