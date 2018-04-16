import React, {Component} from 'react';
import Options from "./Options";
import Destinations from "./Destinations";

/*
 * Renders the sidebar that contains all the tools needed to edit and manipulate
 * a trip.
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="sidebar"
             className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 align-self-left"
             style={{maxHeight: "100%", "overflow-y": "scroll"}}>
          <div className="card-body">
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.plan} type="button">Plan</button>
              </span>

              <input type="text" className="form-control" placeholder=""/>
              <span className="input-group-btn">
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.saveTFFI} type="button">Save</button>
              </span>
            </div>
            <div>
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.reverseTrip} type="button">Reverse Trip
              </button>
            </div>
          </div>
          <Options options={this.props.trip.options}
                   updateOptions={this.props.updateOptions}
                   updateMapType={this.props.updateMapType}
          />
          <Destinations trip={this.props.trip}
                        updateTrip={this.props.updateTrip}
                        query={this.props.query}
                        config={this.props.config}
                        updateQuery={this.props.updateQuery}
                        checkSQL={this.props.checkSQL}
                        addToTrip={this.props.addToTrip}
                        isInTrip={this.props.isInTrip}
                        addAllToTrip={this.props.addAllToTrip}
                        queryPlaces={this.props.queryPlaces}/>
        </div>
    )
  }
}

/**
 * <div
 className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 align-self-left">
 <Options options={this.state.trip.options}
 updateOptions={this.updateOptions}
 updateMapType={this.updateMapType}
 />
 <Destinations trip={this.state.trip}
 updateTrip={this.updateTrip}
 query={this.state.query}
 config={this.state.config}
 updateQuery={this.updateQuery}
 checkSQL={this.checkSQL}
 addToTrip={this.addToTrip}
 isInTrip={this.isInTrip} calcStyles
 addAllToTrip={this.addAllToTrip}
 queryPlaces={this.queryPlaces}
 />
 </div>
 */
/*
return (
    <div id="application">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Instructions number={this.props.number} name={this.props.name}/>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Options options={this.state.trip.options}
                   updateOptions={this.updateOptions}
                   updateMapType={this.updateMapType}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Destinations trip={this.state.trip}
                        updateTrip={this.updateTrip}
                        query={this.state.query}
                        config={this.state.config}
                        updateQuery={this.updateQuery}
                        checkSQL={this.checkSQL}
                        addToTrip={this.addToTrip}
                        isInTrip={this.isInTrip}calcStyles
                        addAllToTrip={this.addAllToTrip}
                        queryPlaces={this.queryPlaces}
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Trip trip={this.state.trip} updateTrip={this.updateTrip}/>
        </div>
      </div>
    </div>
)*/

export default Sidebar;
