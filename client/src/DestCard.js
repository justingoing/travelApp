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

    this.state = {
      destination: this.props.destination,
      tripPosition: this.props.tripPosition,
      distance: this.props.distance,
      showCardInfo: false
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
  }

  removeFromTrip(e) {
    e.preventDefault();
    this.props.removeDestFromTrip(this.state.tripPosition);
  }

  toggleCardInfo(){
    this.setState({showCardInfo: !this.state.showCardInfo});
  }

  toggleCardButton(shouldDisplay) {
    event.preventDefault();
    var info = document.getElementById(this.state.destination.name
        + "InfoButton");
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
        return (<p className="card-text" style={{fontSize: '75%'}}>
          <br/>
          <b>Type:</b> {DestCard.prettyPrintAirportType(
            currState.destination.extraAttrs.type)}
          <hr/>
          <b>City:</b> {currState.destination.extraAttrs.municipality}
          <hr/>
          <b>Region:</b> {currState.destination.extraAttrs.iso_region}
          <hr/>
          <b>Country:</b> {currState.destination.extraAttrs.iso_country}
        </p>);
      }
    };

    return (
        <div className="card" style={{width: '16rem'}}
             onMouseEnter={() => this.toggleCardButton(true)}
             onMouseLeave={() => this.toggleCardButton(false)}>
          <div className="card-body" id={this.state.destination.name + "Card"}>
            <h6 className="card-title h-100">
              <div className="row">
                <div className="col-10">
                  {this.props.destination.name}
                </div>
                <div className="col-2">
                  <div className="btn-group btn-group-sm" role="group"
                       aria-label="Destination Popup">
                    <button className="btn btn-light"
                            style={{display: "none"}}
                            data-toggle="tooltip" data-placement="right"
                            title="More Information and Options"
                            id={this.state.destination.name + "InfoButton"}>
                      <FaDots/>
                    </button>
                  </div>
                </div>
              </div>
              <Popover placement="left"
                       isOpen={this.state.pageShown}
                       target={this.state.destination.name + "Card"}
                       toggle={this.toggleCardInfo}
                       style={{maxHeight: "600px",
                         overflowY: "scroll", fontWeight: "bold", maxWidth: "250px"}}>
                TEST DATA
              </Popover>
            </h6>
            {"Next Destination: " + this.props.distance + " miles"}
          </div>
        </div>
    )
  }
}

export default DestCard;
/*
THESE OUR THE BUTTONS THAT REMOVE/Make new start for the destination
add these back in on the card pop up
 */
/*
                    <button className="btn btn-primary"
                            onClick={this.makeStart}
                            data-toggle="tooltip" data-placement="left"
                            title="Make this the starting destination">
                      <FaMapMarker/>
                    </button>
                    <button className="btn btn-danger"
                            onClick={this.removeFromTrip}
                            data-toggle="tooltip" data-placement="right"
                            title="Remove this destination from the trip">
                      <FaMinus/>
                    </button>
 */
