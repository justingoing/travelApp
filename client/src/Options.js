import React, {Component} from 'react';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);

    this.state = {
        buttonKMStyle: "btn btn-outline-dark ",
        buttonMIStyle: "btn btn-outline-dark active"
    }
  }

  changeOption(e, useKM) {
    e.preventDefault();
      this.props.updateOptions(useKM ? "kilometers" : "miles");
      this.calcStyles(useKM);
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

  componentWillReceiveProps(nextProps) {
      console.log(nextProps.options.distance);
      this.calcStyles(nextProps.options.distance === "kilometers");
  }

  render() {
      return(
        <div id="options" className="card">
          <div className="card-header bg-info text-white">
            Options
          </div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={this.state.buttonMIStyle}>
                <input type="radio" id="miles" name="distance" autcomplete="off" onClick={(e) => this.changeOption(e, false)} defaultChecked/> Miles
              </label>
              <label className={this.state.buttonKMStyle}>
                <input type="radio" id="kilometers" name="distance" autcomplete="off" onClick={(e) => this.changeOption(e, true)}/> Kilometers
              </label>
            </div>
          </div>
        </div>
    )
  }
}

export default Options;