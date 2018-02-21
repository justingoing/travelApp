import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  //loop through distances, sum, and return the total
  calcDistance(){
    var tempDist = 0;
    for(var i = 0; i < this.props.trip.distances.length; i++){
      tempDist += this.props.trip.distances[i];
    }
    return tempDist;
  }

  createTable () {
    let distance = this.calcDistance();  // need to sum this from real the trip
    let units = this.props.trip.options.distance;

    let dests = this.props.trip.places.map((item, index) => <td key={index}>{item.name}</td>);
    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);

    if (dists.length > 0) {
        dists.unshift(<td key={-1}> {0} </td>)
    }

    if (dests.length > 0) {
        dests.push(<td key={-1}> {dests[0].props.children} </td>)
    }


    console.log(this.props.trip);

    return {distance, units, dests, dists};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
          <h4>Round trip distance of {table.distance} {table.units}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle">Destination</th>
              {table.dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-info align-middle">{table.units}</th>
              {table.dists}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;
