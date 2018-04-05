import React, {Component} from 'react';
import Options from './Options';
import Instructions from './Instructions';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    let serverConfig = this.requestConfig();
    this.state = {
      trip: this.getDefaultTrip(),
      query: this.getDefaultQuery(),
      config: serverConfig
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.checkSQL = this.checkSQL.bind(this);
    this.addToTrip = this.addToTrip.bind(this);
    this.isInTrip = this.isInTrip.bind(this);
    this.addAllToTrip = this.addAllToTrip.bind(this);
    this.queryPlaces = {};
  }

  //populate with search
  updateQuery(searchTFFI){
      let copyTFFI = Object.assign({}, this.state.query);

      Object.assign(copyTFFI, searchTFFI);
      let nextTFFI = {
        version: copyTFFI.version,
        type: copyTFFI.type,
        query: copyTFFI.query,
        places: copyTFFI.places
      };

      this.setState({query: nextTFFI});
  }

  checkSQL(query){
        this.state.query.query = this.escapeRegExp(query);
    }


  escapeRegExp(string){
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  getDefaultTrip() {
    let t = {
      version: 3,
      type: "trip",
      title: "",
      options: {
        distance: this.miles(),
        optimization: 0
      },
      places: [],
      distances: [],
      map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
    };

    return t;
  }

  getDefaultQuery() {
    let t = {
      version: 3,
      type: "query",
      query: "",
      filters: [

      ],
      places: []
    };
    return t;
  }

  getDefaultConfig() {
    let t = {
      type: "config",
      version: 3,
      filters: [
      ],
      maps: ["svg"],
      optimization: 0,
      optimizations: [
      ],
      units: [
          "miles"
      ]
    };
    return t;
  }

  async requestConfig(){
    let configRequest = {};

    //try to get configuration from server
    try{
      configRequest = await fetch(process.env.SERVICE_URL + '/config', {
        method: "GET"
      });
    }catch(err){
      console.log("No configuration response from server, assuming sever version 1.0");
      console.error(err);

      return this.getDefaultConfig();
    }

    let ret = await configRequest.json();
    console.log("Server version " + ret.version);
    return ret;
  }

  updateTrip(tffi) {
    let copyTFFI = Object.assign(this.getDefaultTrip(), this.state.trip);
    Object.assign(copyTFFI, tffi);

    let nextTFFI = {
      version: copyTFFI.version,
      type: copyTFFI.type,
      title: copyTFFI.title,
      options: {
        distance: {
          name: copyTFFI.options.distance.name,
          radius: copyTFFI.options.distance.radius
        },
        optimization: copyTFFI.options.optimization
      },
      places: copyTFFI.places,
      distances: copyTFFI.distances,
      map: copyTFFI.map
    };

    nextTFFI = this.checkOptionsV1(nextTFFI, tffi);

    this.setState({trip: nextTFFI});
  }

  checkOptionsV1(nextTFFI, incomingTFFI) {

    if (!nextTFFI.options.distance.name || !nextTFFI.options.distance.radius) {
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
    return {name: "miles", radius: "3958.7613"};
  }

  kilometers() {
    return {name: "kilometers", radius: "6371.0088"};
  }

  updateOptions(options) {
    if (options === "kilometers") {
      this.state.trip.options.distance = this.kilometers();
    } else if (options === "miles") {
      this.state.trip.options.distance = this.miles();
    }
    if(options >= 0 && options <= 1) {
      this.state.trip.options.optimization = options;
    }
  }

  isInTrip(id){
    for(let i = 0; i < this.state.trip.places.length; ++i)
    {
      if(this.state.trip.places[i].id == id) {
        return true;
      }
    }
  }

  addAllToTrip(){
    for(var place in this.queryPlaces){
      this.state.trip.places.push(this.queryPlaces[place]);
    }
    this.queryPlaces = {};
    this.setState({trip: this.state.trip})
  }

  addToTrip(place){
    if(!this.isInTrip(place.id)) {
      this.state.trip.places.push(place);
      delete this.queryPlaces[place.id];
    }
    this.setState({trip: this.state.trip})
  }


  render() {
    return (
        <div id="application" className="container">
            <div className="col-12">
              <Instructions number={this.props.number} name={this.props.name}/>
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip}
                            query={this.state.query}
                            updateQuery={this.updateQuery}
                            checkSQL={this.checkSQL}
                            addToTrip={this.addToTrip}
                            isInTrip={this.isInTrip}
                            addAllToTrip={this.addAllToTrip}
                            queryPlaces={this.queryPlaces}
              />
              <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
              <Trip trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>

        </div>
    )
  }
}

export default Application;