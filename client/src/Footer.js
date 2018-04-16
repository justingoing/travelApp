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
                <p class="text-white">
                    <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CSU_logos/CSU-Official-wrdmrk-357-617_Rev.png" style={{maxHeight: "100"}}/>
                    <b>TripCo t{this.props.number} {this.props.name} &copy; Copyright 2018</b>
                </p>
            </div>
        </div>
    )
  }
}

export default Footer;
/*<p style="color:white;">&copy; Copyright 2018</p> */


/*<div id="footer" className="jumbotron" style={{backgroundColor: "#1E4D28"}} >

          <h4 style={{color:"#FFF"}}>© TripCo t{this.props.number} {this.props.name} 2018</h4>

            <div className="row text-white" >
                <div className="col-12 col-sm-12 col-md-6  col-lg-7 col-xl-8" >
                    <p><br/>&copy; Copyright 2018</p>
                </div>
                <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-right">
                    <img className="img-fluid" src="http://www.cs.colostate.edu/~davematt/logos/CSU_logos/CSU-Official-wrdmrk-357-617_Rev.png">
                    </img>
                </div>
            </div>
        </div> */