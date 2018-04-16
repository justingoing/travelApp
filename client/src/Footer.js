import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="footer" style={{backgroundColor: "#1E4D28"}}>
            <div className="col-12">
                <p className="text-white">
                    <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CSU_logos/CSU-Official-wrdmrk-357-617_Rev.png" style={{maxHeight: "100"}}/>
                    <b>TripCo t{this.props.number} {this.props.name} &copy; Copyright 2018</b>
                </p>
            </div>
        </div>
    )
  }
}

export default Footer;
