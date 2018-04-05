import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.createTable = this.createTable.bind(this);
    this.reorderItinerary = this.reorderItinerary.bind(this);
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

  reorderItinerary(event, index) {
    this.props.setNewStart(index);
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

    return (
        <div className="table-responsive" id="itinerary">
          <table className="table">
            <thead>
            <tr className="table-info">
              <th className="align-middle"
                  style={{color: "#FFF", backgroundColor: "#3E4551"}}>Start
              </th>
              <th className="align-middle" style={{
                color: "#FFF",
                backgroundColor: "#3E4551"
              }}>Destination
              </th>
              <th className="align-middle" style={{
                color: "#FFF",
                backgroundColor: "#3E4551"
              }}>
                {table.units}
              </th>
              <th className="align-right" style={{
                color: "#FFF",
                backgroundColor: "#3E4551"
              }}>
                Options
              </th>
            </tr>
            </thead>
            <tbody>
            {table.tableData}
            </tbody>
          </table>
          <h4>Total distance of {table.distance} {table.units}. </h4>
        </div>
    )
  }
}

export default Itinerary;
