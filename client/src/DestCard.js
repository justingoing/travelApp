import React, {Component} from 'react';

class DestCard extends Component {
  constructor(props) {
    super(props);

    this.prettyPrintAirportType = this.prettyPrintAirportType.bind(this);


    this.state = {
      destination: this.props.destination
    };
  }

  prettyPrintAirportType(airType){
    airType = airType.replace(/_/g, ' ');
    return airType.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  }

  render() {
    return (
        <div className="card" style={{width: '16rem'}}>
          <div className="card-body">
            <h6 className="card-title">{this.state.destination.name}</h6>
            <p className="card-text">
              <br/>
              <b>Type:</b> {this.prettyPrintAirportType(this.state.destination.extraAttrs.type)}<hr/>
              <b>City:</b> {this.state.destination.extraAttrs.municipality}<hr/>
              <b>Region:</b> {this.state.destination.extraAttrs.iso_region}<hr/>
              <b>Country:</b> {this.state.destination.extraAttrs.iso_country}<hr/>
              </p>
          </div>
        </div>
    )
  }
}

export default DestCard;
