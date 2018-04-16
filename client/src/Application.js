import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Map from './Map';
import Itinerary from './Itinerary';

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

    this.state = {
      loading: false,
      trip: {},
      query: {},
      config: {}
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
      title: "",
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
  }

  updateMapType(mapType) {
    if (mapType == "kml" && this.state.config.maps.includes("kml")) {
      this.state.trip.options.map = "kml";
    } else {
      this.state.trip.options.map = "svg";
    }
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
  }

  addToTrip(place) {
    if (!this.isInTrip(place.id)) {
      this.state.trip.places.push(place);
      delete this.queryPlaces[place.id];
    }
    this.setState({trip: this.state.trip})
  }

  render() {
    if (this.state.loading == true) {
      return <h2>LOADING...</h2>;
    }

    return (
        <div id="application">
          <div className="row">
            <nav className="navbar navbar-light"
                 style={{backgroundColor: "#1E4D28"}}>
              <div
                  className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
                <img className="img-fluid"
                     src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png"/>
              </div>
            </nav>
            <div
                className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 align-self-left">
              <Options options={this.state.trip.options}
                       updateOptions={this.updateOptions}
                       updateMapType={this.updateMapType}
              />
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip}
                            query={this.state.query}
                            config={this.state.config}
                            updateQuery={this.updateQuery}
                            checkSQL={this.checkSQL}
                            addToTrip={this.addToTrip}
                            isInTrip={this.isInTrip} calcStyles
                            addAllToTrip={this.addAllToTrip}
                            queryPlaces={this.queryPlaces}
              />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <Map trip={this.state.trip}/>
              <Itinerary trip={this.state.trip}
                         setNewStart={this.setNewStart}/>
            </div>
          </div>
        </div>
    );

    /*
    return (
        <div id="application">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Instructions number={this.props.number} name={this.props.name}/>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Options options={this.state.trip.options}
                       updateOptions={this.updateOptions}
                       updateMapType={this.updateMapType}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip}
                            query={this.state.query}
                            config={this.state.config}
                            updateQuery={this.updateQuery}
                            checkSQL={this.checkSQL}
                            addToTrip={this.addToTrip}
                            isInTrip={this.isInTrip}calcStyles
                            addAllToTrip={this.addAllToTrip}
                            queryPlaces={this.queryPlaces}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Trip trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>
          </div>
        </div>
    )*/
  }
}

export default Application;