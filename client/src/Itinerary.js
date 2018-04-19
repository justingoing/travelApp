import React, {Component} from 'react';
import DestCard from './DestCard';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.createTable = this.createTable.bind(this);
  }

  //loop through distances, sum, and return the total
  calcDistance() {
    let tempDist = 0;
    for (let i = 0; i < this.props.trip.distances.length; i++) {
      tempDist += this.props.trip.distances[i];
    }
    return tempDist;
  }

  createTable() {
    let distance = this.calcDistance();  // need to sum this from real the trip
    let units = this.props.trip.options.distance;

    let dests = this.props.trip.places.map(
        (item, index) => <td key={"de" + index}> {item.name} </td>);
    let dists = this.props.trip.distances.map(
        (item, index) => <td key={"di" + index}> {item}</td>);

    if (dests.length > 0) {
      dests.push(<td key={-1}> {dests[0].props.children} </td>);
    }

    let tableData = [];
    for (let i = 0; i < dests.length - 1; i++) {
      tableData.push(this.renderRow(i, dests[i], dests[i + 1], dists[i]),
          false);
    }

    return {distance, units, tableData};
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
    let table = this.createTable();

    var destRows = [];
    for (let i = 0; i < this.props.trip.places.length; ++i) {
      let dest = this.props.trip.places[i];
      let dist = this.props.trip.distances[i];
      destRows.push(
          <td>
            <DestCard destination={dest} distance={dist} tripPosition={i}
                      reorderItinerary={this.props.setNewStart}
                      removeDestFromTrip={this.props.removeDestFromTrip}/>
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
