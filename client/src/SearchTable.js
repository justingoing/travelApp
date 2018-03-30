import React, {Component} from 'react';

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.table = {};
    this.createTable = this.createTable.bind(this);
  }

  createTable() {
    let ids = this.props.destinations.places.map((item, index) => <td key={"id" + index}> {item.id} </td>);
    let dests = this.props.destinations.places.map((item, index) => <td key={"dest" + index}> {item.name} </td>);
    let lats = this.props.destinations.places.map((item, index) => <td key={"lat" + index}> {item.latitude} </td>);
    let long = this.props.destinations.places.map((item, index) => <td key={"long" + index}> {item.longitude} </td>);

    let tableData = [];

    for(let i = 0; i < ids.length; i++){
      tableData.push(this.renderRow(i, ids[i], dests[i], lats[i], long[i]), false);
    }

    return {ids, dests, lats, long, tableData};
  }

  addToTrip(key){
    console.log(this.props.destinations.places.length);
    this.props.destinations.places.splice(key, 1);
    console.log(this.props.destinations.places.length);
    this.props.addToTrip(this.props.destinations.places[key]);
  }

  renderRow(key, ids, dests, lat, long, selected) {
     let addition = (
              <td className="align-right"><span>
                <button style={{color: "#FFF", backgroundColor: "#3E4551"}}
                        onClick={(e) => this.addToTrip(key)}
                        className="pull-right btn btn-default">
                  Add to Trip
                </button>
              </span></td>
          );

      let opacity = selected ? 0.3 : 1.0;

      return (<tr key={key} style={{opacity: opacity}}>{ids}{dests}{lat}{long}{addition}</tr>);
  }


  render(){
    this.table = this.createTable();
    return(
      <div id="SearchTable">
            <table className="table table-responsive">
                  <thead>
                   <tr className="table-info">
                    <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Id</th>
                    <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Name</th>
                    <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Latitude</th>
                    <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Longitude</th>
                    <th className="align-middle" style={{color: "#FFF", backgroundColor: "#3E4551"}}>Options</th>
                   </tr>
                  </thead>
                  <tbody>
                   {this.table.tableData}
                  </tbody>
                </table>
          </div>
    )
  }
}

export default SearchTable;