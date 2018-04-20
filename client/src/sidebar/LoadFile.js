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
    return (
        <div id="loadFile" className="card-body">
            <input type="file" className="form-control-file"
                   onChange={this.loadTFFI} id="tffifile"/>
        </div>
    );
  }
}

export default LoadFile;
