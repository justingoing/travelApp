import React, {Component} from 'react';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import FaMinus from 'react-icons/lib/fa/minus';

class DestCard extends Component {
  constructor(props) {
    super(props);

    this.makeStart = this.makeStart.bind(this);

    this.state = {
      destination: this.props.destination,
      tripPosition: this.props.tripPosition
    };
  }

  static prettyPrintAirportType(airType){
    airType = airType.replace(/_/g, ' ');
    return airType.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  makeStart(e) {
    e.preventDefault();
    this.props.reorderItinerary(this.state.tripPosition);
  }

  render() {
    let currState = this.props;
    let contents = function() {
      if (currState.destination.extraAttrs && currState.destination.extraAttrs.type) {
        return (<p className="card-text" style={{fontSize: '75%'}}>
          <br/>
          <b>Type:</b> {DestCard.prettyPrintAirportType(currState.destination.extraAttrs.type)}<hr/>
          <b>City:</b> {currState.destination.extraAttrs.municipality}<hr/>
          <b>Region:</b> {currState.destination.extraAttrs.iso_region}<hr/>
          <b>Country:</b> {currState.destination.extraAttrs.iso_country}
        </p>);
      }
    };

    return (
          <div className="card" style={{width: '16rem'}}>
            <div className="card-body">
              <h6 className="card-title">
                <div className="row">
                  <div className="col-10">
                  <span style={{color: "black"}}>{this.state.destination.name}</span>
                  </div>
                  <div className="col-2">
                    <div className="row">
                      <button type="button" className="btn btn-xs btn-primary" onClick={this.makeStart}>
                        <FaMapMarker />
                      </button>
                    </div>
                    <br/>
                    <div className="row">
                      <button type="button" className="btn btn-xs btn-danger">
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </div>
              </h6>
              {contents()}
            </div>
          </div>
    )
  }
}

export default DestCard;
