import React, {Component} from 'react';

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createTable = this.createTable.bind(this);
  }

  createTable() {
    console.log("Search Table Props");
    console.log(this.props);

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

  renderRow(key, ids, dests, lat, long, selected) {

      let addition = (
              <td className="align-right"><span>
                <button style={{color: "#FFF", backgroundColor: "#3E4551"}}
                        onClick={(e) => this.props.addToTrip(key, ids, dests, lat, long)}
                        className="pull-right btn btn-default">
                  Add to Trip
                </button>
              </span></td>
          );

      let opacity = selected ? 0.3 : 1.0;

      return (<tr key={key} style={{opacity: opacity}}>{ids}{dests}{lat}{long}{addition}</tr>);
  }


  render(){
    let table = this.createTable();
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
                   {table.tableData}
                  </tbody>
                </table>
          </div>
    )
  }
}

export default SearchTable;