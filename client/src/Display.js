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
        <div id="display"
             className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-xs-12 align-self-right"
             style={{maxHeight: "100%", "overflow-y": "scroll"}}>
          <Map trip={this.props.trip}/>
          <Itinerary trip={this.props.trip} setNewStart={this.props.setNewStart}
          />
        </div>
    );
  }

}

export default Display;
