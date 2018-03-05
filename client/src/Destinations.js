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
    this.createQuery = this.createQuery.bind(this);
  }

  /**
   * Loads a TFFI file in from disk.
   * @param event - Event this method is being called from.
   */
  loadTFFI(event) {
    let props = this.props;
    let reader = new FileReader();
    reader.onload = function (e) {
      var object = JSON.parse(reader.result);
      props.updateTrip(object);
    };

    reader.readAsText(event.target.files[0]);
  }

  /**
   * Creates a query based on the contents of the form this
   * method is called from.
   *
   * @param event
   */
  createQuery(event) {
    event.preventDefault();
    this.props.updateQuery(event.target.value);
  }

  render() {
    const count = this.props.trip.places.length;
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-dark text-white">
            Destinations
          </div>
          <div className="card-body">
            <p>Search destinations to add:</p>
              <div className="input-group" role="group">
                <input type="text" className="form-control"
                       placeholder="What are you looking for?" onChange={this.createQuery}/>
              </div>
            <br/>
            <p>Or load destinations from a file:</p>

            <div className="input-group" role="group">
              <span className="btn btn-primary"
                    style={{border: "#3E4551", backgroundColor: "#3E4551"}}>
                        Browse&hellip;
                <input type="file"
                       style={{display: "none"}}
                       onChange={this.loadTFFI}
                       id="tffifile"/>
              </span>
              <input type="text" className="form-control" readOnly/>
            </div>
            <h5>There are {count} destinations.</h5>
          </div>
        </div>
    )
  }
}

export default Destinations;