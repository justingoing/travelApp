import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Instructions extends Component {
  constructor(props) {
    super(props);
    console.log("got this.props.name?");
    console.log(this.props.name);
  }

  render() {
    return (
      <div id="Instructions" className="card">
        <div className="card-header bg-dark text-white">
          Instructions
        </div>
        <div className="card-body">
          <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3>
            <br/>
            <p>"Want to travel far and wide?"</p>
          <ol>
            <li>
              Choose options for trip planning, information to display about locations,
              and how the trip map and itinerary should be saved.</li>
            <li>
              Choose your destinations by loading existing sets of destinations or
              find more in an extensive database of locations worldwide.</li>
            <li>
              Plan the trip with the options you selected.
              Review and revise the trip origin and order.
              Save the trip map and itinerary for future reference.</li></ol>
        </div>
      </div>
    )
  }
}

export default Instructions;