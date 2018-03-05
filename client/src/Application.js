import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
        trip: this.getDefaultTFFI(),
        query: {
          version: 2,
          type: "query",
          query: "",
          places: []
        }
    }

    this.updateTrip = this.updateTrip.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  getDefaultTFFI() {
      let t = {
          type: "trip",
              title: "",
              options : {distance: "miles"},
              places: [],
              distances: [],
              map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }

      return t;
  }

  updateTrip(tffi){
    var defaultTrip = this.getDefaultTFFI();

    //If we don't have the required TFFI stuff, let's just go with the default object.
    if ((!tffi.hasOwnProperty('type') || tffi.type !== "trip") ||
        (!tffi.hasOwnProperty('places') || tffi.places === null)) {
        tffi = defaultTrip;
        window.alert("Invalid TFFI!!");
    } else {
        //Make sure we have the places array.
        if (!tffi.hasOwnProperty('places') || tffi.places === null) {
            tffi.places = defaultTrip.places;
        }

        //Make sure we have the distances array.
        if (!tffi.hasOwnProperty('distances') || tffi.distances === null) {
            tffi.distances = defaultTrip.distances;
        }

        //Make sure we have a title.
        if (!tffi.hasOwnProperty('title') || tffi.title === null) {
            tffi.title = defaultTrip.title;
        }

        //Ensure that we have options.
        if (!tffi.hasOwnProperty('options') || tffi.options === null) {
            tffi.options = defaultTrip.options;
        } else {
            //Ensure that we have at least the distances
            if (!tffi.options.hasOwnProperty('distance') || tffi.options.distance === null) {
                tffi.options.distance = defaultTrip.options.distance;
            }
        }
    }

    this.setState({trip:tffi});
  }

  updateOptions(options){
    if (options === "kilometers" || options === "miles") {
        this.state.trip.options.distance = options;
    }
  }

  updateQuery(query){
    this.state.query.query = this.escapeRegExp(query);
    console.log(this.state.query);
  }

  //From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions.
  //Makes sure someone can't crash the client by putting in an invalid character.
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  render() {
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
                <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip} updateQuery={this.updateQuery}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} />
            </div>
          </div>
        </div>
    )
  }


  /* Sends a request to the server with the query for destinations.
   */
  fetchQueryResponse(){
    console.log(process.env.SERVICE_URL);
    console.log("POSTing: " + JSON.stringify(this.state.query));
    return fetch(process.env.SERVICE_URL + '/query', {
      method:"POST",
      body: JSON.stringify(this.state.query)
    });
  }

  async query(){
    try {
      let serverResponse = await this.fetchQueryResponse();
      let queryTFFI = await serverResponse.json();
      console.log(queryTFFI);
      this.setState({query: queryTFFI})
    } catch(err) {
      console.error(err);
    }
  }

}

export default Application;