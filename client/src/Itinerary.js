import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

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


    let dests = this.props.trip.places.map((item, index) => <td key={index}> {item.name} </td>);
    let dists = this.props.trip.distances.map((item, index) => <td key={index}> {item}</td>);

    if (dests.length > 0) {
        dests.push(<td key={-1}> {dests[0].props.children} </td>);
    }

    let tableData = [];
    for (let i = 0; i < dests.length - 1; i++) {
      tableData.push(this.renderRow(i, dests[i], dests[i + 1], dists[i]), false);
    }


    console.log(this.props.trip);

    return {distance, units, tableData};
  }

  _startDrag() {

    console.log("Starting drag");
  }

  _endDrag() {
    console.log("Done");
  }

  _updateDrag(event) {
    console.log("Updating");
    console.log(event.clientX);
    console.log(event.clientY);
  }

  _leaveDrag() {
    console.log("Leaving");
  }

  renderRow(key, source, destination, distance, selected) {
    let dragHandle = (
        <span >
          <button className="pull-right btn btn-default"
                  onMouseDown={this._startDrag.bind(this)}
                  onMouseMove={this._updateDrag.bind(this)}
                  onMouseUp={this._endDrag.bind(this)}
                  onMouseLeave={this._leaveDrag.bind(this)}>ClickNDrag</button>
        </span>
    );

    let opacity = selected ? 0.3 : 1.0;

    return (<tr key={key} style={{opacity: opacity}}>{source}{destination}{distance}</tr>);
  }


  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Start</th>
              <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Destination</th>
              <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>{table.units}</th>
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
