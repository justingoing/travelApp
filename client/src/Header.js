import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" style={{backgroundColor: "#1E4D28"}}>
            <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
                <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png" style={{maxHeight: "125"}}/>
            </div>
        </div>

    )
  }

}

export default Header;

/*<div id="header" className="jumbotron" style={{backgroundColor: "#1E4D28"}}>
            <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
                <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png"/>
            </div>
            <div className="col-12 col-sm-12 col-md-6  col-lg-7 col-xl-8" >
                <br/>
            </div>
        </div> */
