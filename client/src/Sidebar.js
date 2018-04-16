import React, {Component} from 'react';

/*
 * Renders the sidebar that contains all the tools needed to edit and manipulate
 * a trip.
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="sidebar" className="">
          <div className="card-body">
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.plan} type="button">Plan</button>
              </span>

              <input type="text" className="form-control" placeholder=""/>
              <span className="input-group-btn">
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.saveTFFI} type="button">Save</button>
              </span>
            </div>
            <div>
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.reverseTrip} type="button">Reverse Trip
              </button>
            </div>
          </div>
        </div>
    )
  }
}

export default Sidebar;
