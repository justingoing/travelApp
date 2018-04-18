import React, {Component} from 'react';

/* 
 * Allows the user to load a file into the application.
 */
class LoadFile extends Component {
  constructor(props) {
    super(props);
    this.loadTFFI = this.loadTFFI.bind(this);
  }

  loadTFFI(event) {
    let props = this.props;
    let reader = new FileReader();
    reader.onload = function (e) {
      let object = JSON.parse(reader.result);
      props.updateTrip(object);
    };
    reader.readAsText(event.target.files[0]);
  }

  render() {
    const count = this.props.trip.places.length;

    return (
        <div id="loadFile" className="card-body">
          <p>Load destinations from a file.</p>
          <div className="form-group" role="group">
            <input type="file" className="form-control-file"
                   onChange={this.loadTFFI} id="tffifile"/>
          </div>
          <h5>There are {count} destinations. </h5>
        </div>
    );
  }
}

export default LoadFile;
