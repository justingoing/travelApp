import React, {Component} from 'react';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
    this.changeMaps = this.changeMaps.bind(this);


    this.state = {
      buttonKMStyle: "btn btn-outline-dark ",
      buttonMIStyle: "btn btn-outline-dark active",
      buttonSVGStyle: "btn btn-outline-dark ",
      buttonKMLStyle: "btn btn-outline-dark active"
    }
  }

  changeOption(e, useKM) {
    e.preventDefault();
    this.props.updateOptions(useKM ? "kilometers" : "miles");
    this.calcStyles(useKM);
  }

  changeMaps(e, useKML) {
    e.preventDefault();
    this.props.updateMapType(useKML ? "kml" : "svg");
    this.calcMaps(useKML);
  }

  calcStyles(useKilometers) {
    let defaultStyle = "btn btn-outline-dark ";

    if (useKilometers) {
      this.setState({buttonKMStyle: defaultStyle + "active"});
      this.setState({buttonMIStyle: defaultStyle});
    } else {
      this.setState({buttonMIStyle: defaultStyle + "active"});
      this.setState({buttonKMStyle: defaultStyle});
    }
  }

  calcMaps(useKML) {
    let defaultStyle = "btn btn-outline-dark ";

    if (useKML) {
      this.setState({buttonKMLStyle: defaultStyle + "active"});
      this.setState({buttonSVGStyle: defaultStyle});
    } else {
      this.setState({buttonSVGStyle: defaultStyle + "active"});
      this.setState({buttonKMLStyle: defaultStyle});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.calcStyles(nextProps.options.distance === "kilometers");

    var input = document.getElementById("typeinp");
    input.value = nextProps.options.optimization;
  }

  onInput() {
    var input = document.getElementById("typeinp");
    var currentVal = input.value;
    this.props.updateOptions(currentVal);
    //console.log("value is ", currentVal); //here's how to see value of slider or input.value or document.getElementById("typeinp")
    this.setState({
      value: currentVal
    })
  }

  render() {
    return (
        <div id="options" className="card">
          <div className="card-header text-white" style={{backgroundColor:"#1E4D2B"}}>
            Options
          </div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
            <span className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={this.state.buttonMIStyle} style={{backgroundColor:"#1E4D2B"}}>
                <input type="radio" id="miles" name="distance" autcomplete="off"
                       onClick={(e) => this.changeOption(e, false)}
                       defaultChecked/> Miles
              </label>
              <label className={this.state.buttonKMStyle} style={{backgroundColor:"#1E4D2B"}}>
                <input type="radio" id="kilometers" name="distance"
                       autcomplete="off"
                       onClick={(e) => this.changeOption(e, true)}/> Kilometers
              </label>
            </span>
            --
            <span className="btn-group btn-group-toggle" data-toggle="buttons" align="right">
              <label className={this.state.buttonSVGStyle} style={{backgroundColor:"#1E4D2B"}}>
                <input type="radio" id="miles" name="distance" autcomplete="off"
                       onClick={(e) => this.changeMaps(e, false)}
                       defaultChecked/> SVG
              </label>
              <label className={this.state.buttonKMLStyle} style={{backgroundColor:"#1E4D2B"}}>
                <input type="radio" id="kilometers" name="distance"
                       autcomplete="off"
                       onClick={(e) => this.changeMaps(e, true)}/> KML
              </label>
            </span>
            <br></br>
            <p>Zero Optimization <input id="typeinp" type="range" min="0" max="1" step=".01" defaultValue={Number(this.props.options.optimization)}
                                        onChange={this.onInput.bind(this)}/> Full Optimization</p>
            <p>Map Type</p>
          </div>
        </div>
    )
  }
}

export default Options;