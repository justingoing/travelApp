import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: this.getDefaultTrip(),
      query: this.getDefaultQuery(),
      config: this.getDefaultConfig()
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  getDefaultTrip() {
    let t = {
      version: 2,
      type: "trip",
      title: "",
      options: {
        distance: {name: "miles", radius: "3958.7613"},
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
      version: 2,
      type: "query",
      query: "",
      places: []
    };
    return t;
  }

  getDefaultConfig() {
    let t = {
      version: 2,
      type: "config",
      optimization: 1
    };
    return t;
  }

  updateTrip(tffi) {
    console.log("Updating... starts as", tffi);
    console.log(this.state.trip.options.optimization);
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

      nextTFFI = Object.assign(this.getDefaultTrip(), nextTFFI);
    this.setState({trip: nextTFFI});

    //this.updateOptions("miles");
    //this.updateOptions(0.6);

      console.log("After updateTrip...", this.state.trip);

  }

  updateOptions(options) {
    if (options === "kilometers") {
      this.state.trip.options.distance = {
        name: "kilometers",
        radius: "6371.0088"
      };
    } else if (options === "miles") {
      this.state.trip.options.distance = {name: "miles", radius: "3958.7613"};
    }
    if(options >= 0 && options <= 1) {
      this.state.trip.options.optimization = options;
      console.log("optimization = ", this.state.trip.options.optimization);
    }
  }

  render() {
    return (
        <div id="application" className="container">

        <div className="col-12">
          <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
        </div>


            <div className="col-12">
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