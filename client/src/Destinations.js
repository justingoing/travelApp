import React, {Component} from 'react';

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */
class Destinations extends Component {
  constructor(props) {
    super(props);
    this.loadTFFI = this.loadTFFI.bind(this);
  }

    loadTFFI(event) {
        var props = this.props;
        var reader = new FileReader();
        reader.onload = function(e) {
            var object = JSON.parse(reader.result);
            props.updateTrip(object);
        };

        reader.readAsText(event.target.files[0]);
    }

  render() {
    const count = this.props.trip.places.length;
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-info text-white">
            Destinations
          </div>
          <div className="card-body">
            <p>Load destinations from a file.</p>
            <div className="form-group" role="group">
                <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
            </div>
            <h5>There are {count} destinations. </h5>
          </div>
        </div>
    )
  }
}

export default Destinations;