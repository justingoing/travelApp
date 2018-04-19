import React, {Component} from 'react';

/*
 * Renders the trip title input field, and updates state appropriately.
 */
class TripInfo extends Component {
  constructor(props) {
    super(props);

    this.setTripTitle = this.setTripTitle.bind(this);
    this.calcDistance = this.calcDistance.bind(this);

    this.state = {
      hover: false,
      focus: false
    };
  }

  setTripTitle(e) {
    let newTitle = {
      title: e.target.value
    };
    this.props.updateTrip(newTitle);
  }

  setHover(e, hover) {
    e.preventDefault();
    this.setState({hover: hover});
  }

  setFocus(e, focus) {
    e.preventDefault();
    this.setState({focus: focus});
  }

  calcDistance() {
    let tempDist = 0;
    for (let i = 0; i < this.props.trip.distances.length; i++) {
      tempDist += this.props.trip.distances[i];
    }
    return tempDist;
  }

  render() {
    let makeBorder = this.state.hover || this.state.focus;

    let style = {
      background: "rgba(0,0,0,0)",
      border: (makeBorder ? "solid" : "none"),
      borderWidth: "1px",
      textAlign: "center",
      fontWeight: "bold"
    };

    let distance = this.calcDistance();
    let units = this.props.trip.options.distance;

    return (<div className="jumbotron my-2 py-3 px-0"
                 style={{backgroundColor: "white"}}>
          <input id="triptitle" type="text" className="form-control"
                 value={this.props.trip.title}
                 placeholder="Name your trip..."
                 onChange={this.setTripTitle}
                 style={style}
                 onMouseEnter={(e) => this.setHover(e, true)}
                 onMouseLeave={(e) => this.setHover(e, false)}
                 onFocus={(e) => this.setFocus(e, true)}
                 onBlur={(e) => this.setFocus(e, false)}/>
          <hr style={{backgroundColor: "#C8C372", margin: "4px", height: "1px"}}/>
          <p className="px-4 py-2 m-0">Destinations: {this.props.trip.places.length} </p>
          <p className="px-4 py-2 m-0">Distance: {distance} {units} </p>
          <hr style={{backgroundColor: "#C8C372", margin: "4px", height: "1px"}}/>
        </div>
    );
  }
}

export default TripInfo;