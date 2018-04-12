import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
    super(props);

    this.plan = this.plan.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.setNewStart = this.setNewStart.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    console.log(process.env.SERVICE_URL);
    console.log("POSTing: " + this.props.trip);
    return fetch(process.env.SERVICE_URL + '/plan', {
      method:"POST",
      body: JSON.stringify(this.props.trip)
    });
  }

  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      if(tffi.code == "500"){
        alert(tffi.message);
      }else{
        this.props.updateTrip(tffi);
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
    var blob = new Blob([JSON.stringify(this.props.trip)], {type: "text/plain;charset=utf-8"});

    //Create title
    var title = this.props.trip.title;
    if (title === "") {
      title = "Trip.json"
    } else {
      title += ".json";
    }

    //Save file
    Saver.saveAs(blob, title);
  }

  reverseTrip() {
    console.log(this.props);

    let places = this.props.trip.places;
    let distances = this.props.trip.distances;
    let newState = {
      places: places.reverse(),
      distances: distances.reverse()
    };
    this.props.updateTrip(newState);
  }

  setNewStart(index) {
    let distancesCopy = Trip.reorder(this.props.trip.distances, index);
    let placesCopy = Trip.reorder(this.props.trip.places, index);

    let newState = {
      places: placesCopy,
      distances: distancesCopy
    };

    this.props.updateTrip(newState);
  }

  static reorder(array, index) {
    if (index < 0 || index >= array.length) {
      return array;
    }

    return array.slice(index).concat(array.slice(0, index));
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
        <div id="trip" className="card">
          <div className="card-header text-white"style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}>Trip</div>
          <div className="card-body">
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary " style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}} onClick={this.plan} type="button">Plan</button>
            </span>
              <input type="text" className="form-control" placeholder=""/>
              <span className="input-group-btn">
              <button className="btn btn-primary " style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}} onClick={this.saveTFFI} type="button">Save</button>
            </span>
            </div>
            <div>
              <button className="btn btn-primary " style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}} onClick={this.reverseTrip} type="button">Reverse Trip</button>
            </div>
          <br/>
            <p>Places currently in your trip</p>
            <br/>
            <Itinerary trip={this.props.trip} setNewStart={this.setNewStart}/>
            <p>Give your trip a title before planning or saving.</p>
            <Map trip={this.props.trip} />
          </div>
        </div>
    )
  }
}

export default Trip;