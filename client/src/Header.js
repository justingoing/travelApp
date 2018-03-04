import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="jumbotron" style={{backgroundColor: "#1E4D28"}}>
            <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
                <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png">
                </img>
            </div>
            <div className="col-12 col-sm-12 col-md-6  col-lg-7 col-xl-8" >
                <br></br>
                <h3 style={{color:"#FFF"}}>TripCo <small>t{this.props.number} {this.props.name}</small></h3>
            </div>
            <p className="lead" style={{color:"#FFF"}}>
              <br/>"Want to travel far and wide?"</p>
            <ol style={{color:"#FFF"}}>
              <li>
                Choose options for trip planning, information to display about locations,
                and how the trip map and itinerary should be saved.</li>
              <li>
                Choose your destinations by loading existing sets of destinations or
                find more in an extensive database of locations worldwide.</li>
              <li>
                Plan the trip with the options you selected.
                Review and revise the trip origin and order.
                Save the trip map and itinerary for future reference.</li>
            </ol>
        </div>
    )
  }

}

export default Header;
