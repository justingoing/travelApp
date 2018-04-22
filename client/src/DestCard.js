import React, {Component} from 'react';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import FaMinus from 'react-icons/lib/fa/minus';
import FaDots from 'react-icons/lib/fa/ellipsis-h';
import {
  Button,
  Popover,
  ListGroupItem,
  ListGroup,
  Collapse
} from 'reactstrap';

class DestCard extends Component {
  constructor(props) {
    super(props);

    this.makeStart = this.makeStart.bind(this);
    this.removeFromTrip = this.removeFromTrip.bind(this);
    this.toggleCardButton = this.toggleCardButton.bind(this);
    this.toggleCardInfo = this.toggleCardInfo.bind(this);

    let domString = this.props.destination.name.replace(/\s/g, '')
    .replace(/[0-9]/g, '').replace(/[^a-z]/gi, '').toLowerCase();
    console.log("DOM STRING " + domString);

    this.state = {
      destination: this.props.destination,
      tripPosition: this.props.tripPosition,
      distance: this.props.distance,
      showCardInfo: false,
      domString: domString
    };
  }

  static prettyPrintAirportType(airType) {
    airType = airType.replace(/_/g, ' ');
    return airType.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  makeStart(e) {
    e.preventDefault();
    this.props.reorderItinerary(this.state.tripPosition);
    this.toggleCardInfo();
  }

  removeFromTrip(e) {
    e.preventDefault();
    this.props.removeDestFromTrip(this.state.tripPosition);
    this.toggleCardInfo();
  }

  toggleCardInfo() {
    this.setState({showCardInfo: !this.state.showCardInfo});
  }

  toggleCardButton(shouldDisplay) {
    event.preventDefault();
    var info = document.getElementById(this.state.domString
        + "infobutton");
    if (shouldDisplay) {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }

  render() {
    let currState = this.props;

    let contents = function () {
      if (currState.destination.extraAttrs
          && currState.destination.extraAttrs.type) {
        return (
            <p style={{fontSize: '85%'}}>
              <br/>
              <b>ID:</b> {currState.destination.id}
              <hr/>
              <b>Type:</b> {DestCard.prettyPrintAirportType(
                currState.destination.extraAttrs.type)}
              <hr/>
              <b>City:</b> {currState.destination.extraAttrs.municipality}
              <hr/>
              <b>Region:</b> {currState.destination.extraAttrs.iso_region}
              <hr/>
              <b>Country:</b> {currState.destination.extraAttrs.iso_country}
              <hr/>
              <b>Latitude:</b> {currState.destination.latitude}
              <hr/>
              <b>Longitude:</b> {currState.destination.longitude}

            </p>);
      }
      else {
        return (
            <p>
              Unable to load more detailed information at this time
              <br/>
              Try connecting to a different server?
            </p>
        );
      }
    };

    return (
        <div className="card" style={{width: '16rem'}}
             onMouseEnter={() => this.toggleCardButton(true)}
             onMouseLeave={() => this.toggleCardButton(false)}>
          <div className="card-body" id={this.state.domString + "card"}>
            <h6 className="card-title h-100">
              <div className="row">
                <div className="col-10">
                  {this.props.destination.name}
                </div>
                <div className="col-2">
                  <div className="btn-group btn-group-sm" role="group"
                       aria-label="Destination Popup">
                    <button className="btn btn-light float-right p-1"
                            style={{display: "none"}}
                            data-toggle="tooltip" data-placement="right"
                            title="More Information and Options"
                            id={this.state.domString + "infobutton"}
                            onClick={this.toggleCardInfo}>
                      <FaDots/>
                    </button>
                  </div>
                </div>
              </div>
              <Popover placement="right"
                       isOpen={this.state.showCardInfo}
                       target={this.state.domString
                       + "infobutton"}
                       toggle={this.toggleCardInfo}
                       style={{
                         maxHeight: "600px",
                         fontWeight: "bold",
                         maxWidth: "250px"
                       }}>
                <div className="card" style={{width: '18rem'}}>
                  <div className="card-body" id={this.state.domString + "card"}>
                    <h6 className="card-title h-100">
                      More Info and Options
                    </h6>
                    <div className="card-text">
                      {contents()}
                      <div className="btn-group btn-group-sm" role="group"
                           aria-label="Destination Popup">
                        <button className="btn btn-primary"
                                onClick={this.makeStart}
                                data-toggle="tooltip" data-placement="left"
                                title="Make this the starting destination"
                                style={{backgroundColor: "#59595B"}}>
                          <FaMapMarker/>
                        </button>
                        <button className="btn btn-danger"
                                onClick={this.removeFromTrip}
                                data-toggle="tooltip" data-placement="right"
                                title="Remove this destination from the trip"
                                style={{backgroundColor: "#D9782D"}}>
                          <FaMinus/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover>
            </h6>
            {"Next Destination: " + this.props.distance + " miles"}
          </div>
        </div>
    )
  }
}

export default DestCard;
