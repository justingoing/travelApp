import React, {Component} from 'react';
import Map from "./Map";
import Itinerary from "./Itinerary";

/*
 * Renders the map and itinerary part of the UI.
 */
class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <Map trip={this.props.trip}/>
        </div>
    );
  }

//<Itinerary trip={this.props.trip}
//setNewStart={this.props.setNewStart}/>
}

export default Display;
