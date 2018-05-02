import React, {Component} from 'react';
import Map from "../Map";
import Itinerary from "../Itinerary";

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
             className="col-xl-9 col-lg-6 col-md-6 col-sm-12 col-xs-12 align-self-right p-0"
             style={{maxHeight: "100%", overflowY: "scroll"}}>
          <Map trip={this.props.trip}/>
          <Itinerary trip={this.props.trip} setNewStart={this.props.setNewStart}
                     plan={this.props.plan}
                     removeDestFromTrip={this.props.removeDestFromTrip}
          />
        </div>
    );
  }

}

export default Display;
