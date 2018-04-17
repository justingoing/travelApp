import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;

    this.props.updateSize({header: height})
    this.height = 0;
    console.log(height);
  }

  render() {

    /*
    if (this.divElement && this.divElement.clientHeight != this.height) {

      const height = this.divElement.clientHeight;

      this.props.updateSize({header: height});

      console.log("height", height);
    }*/

    return (
        <div id="header" style={{backgroundColor: "#1E4D28"}} ref={(divElement) => this.divElement = divElement}>
          <div
              className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
            <img className="img-fluid"
                 src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png" style={{maxHeight: "50"}}/>
          </div>
        </div>
    );
  }
}

export default Header;
