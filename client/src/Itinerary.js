import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  createTable () {
    let distance = 0;  // need to sum this from real the trip
    let units = this.props.trip.options.distance;

    //console.log(this.props.trip.places);
    let dests = this.props.trip.places.map((item) => <td>{item.name}</td>);
    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);

    console.log(this.props.trip);

    return {distance, units, dests, dists};
  }

  createRows(){

  }

  render() {
    let table = this.createTable();
    var length = this.props.trip.places.length;

    return(



        <div id="itinerary">
            <h4>Round trip distance of {table.distance} {table.units}. </h4>
            <table className="table table-responsive table-bordered">
                <thead>
                <tr className="table-info">
                    <th className="align-middle">Destination</th>
                    <th className="align-middle">{table.units}</th>
                </tr>
                </thead>
                <tbody>
                <script>
                    function createRows() {
                    var myRows;
                    for (var i = 0; i < length; i++) {
                    myRows += "<tr>";
                    myRows += "<td> this.props.trip.places[i] </td>";
                    myRows += "<td> this.props.trip.distances[i] </td>";
                    myRows += "</tr>";
                }
                    document.write(myRows);
                }

                </script>
                <script>
                    this.createRows();

                </script>
                </tbody>
            </table>
        </div>


        /*
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
        */
    )
  }
}

export default Itinerary;
