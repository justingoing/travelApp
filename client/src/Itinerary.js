import React, {Component} from 'react';
import DestCard from './DestCard';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  renderRow(key, source, destination, distance) {
    let dragHandle = (
        <td className="align-right"><span>
          <button style={{color: "#FFF", backgroundColor: "#3E4551"}}
                  onClick={(e) => this.reorderItinerary(e, key)}
                  className="pull-right btn btn-default">
            Make Start Location.
          </button>
        </span></td>
    );

    let dist = distance === undefined ? <td>---</td> : distance;

    return (<tr key={key}>{source}{destination}{dist}{dragHandle}</tr>);
  }

  render() {
    var destRows = [];
    for (let i = 0; i < this.props.trip.places.length; ++i) {
      let dest = this.props.trip.places[i];
      let dist = this.props.trip.distances[i];
      destRows.push(
          <td>
            <DestCard destination={dest} distance={dist} tripPosition={i}
                      plan={this.props.plan}
                      reorderItinerary={this.props.setNewStart}
                      removeDestFromTrip={this.props.removeDestFromTrip}
                      trip={this.props.trip}
            />
          </td>
      );
    }

    return (
        <div className="table-responsive" id="itinerary">
          <table className="table">
            <tr>
              <th scope="col"></th>
              {destRows}
            </tr>
          </table>
        </div>
    )
  }
}

export default Itinerary;
