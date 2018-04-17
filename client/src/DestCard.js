import React, {Component} from 'react';

class DestCard extends Component {
  constructor(props) {
    super(props);

    this.prettyPrintAirportType = this.prettyPrintAirportType.bind(this);


    this.state = {
      destination: this.props.destination,
      tripPosition: this.props.tripPosition
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
        <div className="view zoom">
          <div className="card" style={{width: '16rem'}}>
            <div className="card-body">
              <h6 className="card-title">
                <div className="row">
                  <div className="col-10">
                  <span style={{color: "black"}}>{this.state.destination.name}</span>
                  </div>
                  <div className="col-2">
                    <div className="row">
                      <div className="btn btn-primary btn-sq-sm">
                        <span className="glyphicon glyphicon-minus"></span>
                      </div>

                    </div>
                    <div className="row">
                      <div className="btn btn-danger btn-sq-sm">
                      </div>
                    </div>
                  </div>
                </div>
              </h6>
              <p className="card-text" style={{fontSize: '75%'}}>
                <br/>
                <b>Type:</b> {this.prettyPrintAirportType(this.state.destination.extraAttrs.type)}<hr/>
                <b>City:</b> {this.state.destination.extraAttrs.municipality}<hr/>
                <b>Region:</b> {this.state.destination.extraAttrs.iso_region}<hr/>
                <b>Country:</b> {this.state.destination.extraAttrs.iso_country}
                </p>
            </div>
          </div>
          <div className="mask flex-center">
            <p className="white-text">More Info</p>
          </div>
        </div>
    )
  }
}

export default DestCard;
