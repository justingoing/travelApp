import React, {Component} from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Cookies from 'universal-cookie';

const cookieHelper = new Cookies();


/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);
    this.toggleMapChooser = this.toggleMapChooser.bind(this);
    this.toggleUnitsChooser = this.toggleUnitsChooser.bind(this);
    this.setMap = this.setMap.bind(this);
    this.setUnits = this.setUnits.bind(this);
    this.loadCookies = this.loadCookies.bind(this);

    this.state = {
      unitsChooserOpen: false,
      mapTypeChooserOpen: false
    };

    // cookie keys, avoid magic strings
    this.cookiesKeys = {
      distanceUnits: "distanceUnits",
      mapType: "mapType",
      optimizationLevel: "optLevel"
    };

    // Update components with cookies from last session
    this.loadCookies();
  }

  componentWillReceiveProps(nextProps) {
    let input = document.getElementById("typeinp");
    input.value = nextProps.options.optimization;
  }

  onInput() {
    let input = document.getElementById("typeinp");
    let currentVal = input.value;
    this.props.updateOptions(currentVal);
    cookieHelper.set(this.cookiesKeys.optimizationLevel, currentVal);
    this.setState({
      value: currentVal
    });
  }

  loadCookies() {
    let distanceCookie = cookieHelper.get(this.cookiesKeys.distanceUnits);
    if(distanceCookie)
      this.props.updateOptions(distanceCookie);

    let mapCookie = cookieHelper.get(this.cookiesKeys.mapType);
    if(mapCookie)
      this.props.updateMapType(mapCookie);

    let optCookie = cookieHelper.get(this.cookiesKeys.optimizationLevel);
    if(optCookie) {
      optCookie = Number(optCookie);
      this.props.updateOptions(optCookie);
    }
  }

  toggleMapChooser(e, value) {
    e.preventDefault();
    this.setState({mapTypeChooserOpen: !this.state.mapTypeChooserOpen});
  }

  setMap(e, value) {
    let set = value === "kml" ? "kml" : "svg";
    cookieHelper.set(this.cookiesKeys.mapType, set);
    this.props.updateMapType(set);
  }

  setUnits(e, value) {
    let set = value === "kilometers" ? "kilometers" : "miles";
    cookieHelper.set(this.cookiesKeys.distanceUnits, set);
    this.props.updateOptions(set);
  }

  toggleUnitsChooser(e) {
    e.preventDefault();
    this.setState({unitsChooserOpen: !this.state.unitsChooserOpen});
  }

  render() {
    return (
        <div id="options" className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-5">
                <p>Units: </p>
              </div>
              <div className="col-7">
                <div className="pull-right">
                  <ButtonDropdown isOpen={this.state.unitsChooserOpen}
                                  toggle={(e) => this.toggleUnitsChooser(e)}
                                  style={{width: "135px", border: "#FFF", backgroundColor: "#59595B"}}>
                    <DropdownToggle style={{width: "135px", border: "#FFF", backgroundColor: "#59595B"}} caret>
                      {this.props.options.distance === "kilometers" ? "Kilometers" : "Miles"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={(e) => this.setUnits(e,
                          "miles")}>Miles</DropdownItem>
                      <DropdownItem onClick={(e) => this.setUnits(e,
                          "kilometers")}>Kilometers</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">

                <p>MapType: </p>
              </div>
              <div className="col-7">
                <div className="pull-right">
                  <ButtonDropdown isOpen={this.state.mapTypeChooserOpen}
                                  toggle={(e) => this.toggleMapChooser(e)}
                                  style={{width: "135px", border: "#FFF", backgroundColor: "#59595B"}}>
                    <DropdownToggle style={{width: "135px", border: "#FFF", backgroundColor: "#59595B"}} caret>{this.props.options.map === "kml"
                        ? "Google Maps" : "SVG"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={(e) => this.setMap(e, "kml")}>Google
                        Maps</DropdownItem>
                      <DropdownItem onClick={(e) => this.setMap(e,
                          "svg")}>SVG</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <p>Optimization</p>
              </div>
              <div className="col-7">
                <input id="typeinp" type="range" min="0" max="1" step=".01"
                       defaultValue={Number(this.props.options.optimization)}
                       onMouseUp={this.onInput.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Options;
