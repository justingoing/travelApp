import React, {Component} from 'react';

/*
 * Allows the user to save the trip and the KML files.
 */
class Save extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let kmlPanel = this.props.map === "kml" ? (
        <div>
          <br/>
            <div className="row">
            <div className="col-5">
            <button className="btn btn-primary "
                    style={{border: "#FFF", backgroundColor: "#59595B", width: "100px"}}
                    onClick={this.props.saveKML} type="button">Save KML</button>
          </div>
        </div>
    </div>) : (<div></div>);

    return (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-5">
                <button className="btn btn-primary "
                        style={{border: "#FFF", backgroundColor: "#59595B", width: "100px"}}
                        onClick={this.props.saveTFFI} type="button">Save Trip</button>
              </div>
            </div>
            {kmlPanel}
          </div>
        </div>
    );
  }
}

export default Save;
