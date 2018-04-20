import React, {Component} from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

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

    this.state = {
      unitsChooserOpen: false,
      mapTypeChooserOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let input = document.getElementById("typeinp");
    input.value = nextProps.options.optimization;
  }

  onInput() {
    let input = document.getElementById("typeinp");
    let currentVal = input.value;
    this.props.updateOptions(currentVal);
    this.setState({
      value: currentVal
    });
  }

  toggleMapChooser(e, value) {
    e.preventDefault();
    this.setState({mapTypeChooserOpen: !this.state.mapTypeChooserOpen});
  }

  setMap(e, value) {
    this.props.updateMapType(value === "kml" ? "kml" : "svg");
  }

  setUnits(e, value) {
    let set = value === "kilometers" ? "kilometers" : "miles";
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
            <div class="row">
              <div class="col-5">
                <p>Units: </p>
              </div>
              <div class="col-7">
                <div class="pull-right">
                  <ButtonDropdown isOpen={this.state.unitsChooserOpen}
                                  toggle={(e) => this.toggleUnitsChooser(e)}>
                    <DropdownToggle style={{width: "135px"}} caret>
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

            <div class="row">
              <div class="col-5">

                <p>MapType: </p>
              </div>
              <div class="col-7">
                <div class="pull-right">
                  <ButtonDropdown isOpen={this.state.mapTypeChooserOpen}
                                  toggle={(e) => this.toggleMapChooser(e)}
                            style={{width: "165px"}}>
                    <DropdownToggle style={{width: "135px"}} caret>{this.props.options.map === "kml"
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

            <div class="row">
              <div class="col-5">
                <p>Optimization</p>
              </div>
              <div class="col-7">
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
