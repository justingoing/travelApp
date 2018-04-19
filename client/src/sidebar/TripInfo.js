import React, {Component} from 'react';

/*
 * Renders the trip title input field, and updates state appropriately.
 */
class TripInfo extends Component {
  constructor(props) {
    super(props);

    this.setTripTitle = this.setTripTitle.bind(this);

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

  render() {
    let makeBorder = this.state.hover || this.state.focus;
    let style = {
      background: "rgba(0,0,0,0)",
      border: (makeBorder ? "solid" : "none"),
      borderWidth: "0.5px",
      textAlign: "center"
    };

    return (<div className="container py-2">
              <input id="triptitle" type="text" className="form-control"
                   value={this.props.trip.title}
                   onChange={this.setTripTitle}
                   style={style}
                   onMouseEnter={(e) => this.setHover(e, true)}
                   onMouseLeave={(e) => this.setHover(e, false)}
                   onFocus={(e) => this.setFocus(e, true)}
                   onBlur={(e) => this.setFocus(e, false)}/>
              <br/>
              <hr style={{backgroundColor: "#C8C372"}}/>
            </div>
    );
  }
}

export default TripInfo;