import React, {Component} from 'react';

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createTable = this.createTable.bind(this);
  }

  createTable() {

                let ids = 1;
                let name = 2;
                let lat = 3;
                let long = 4;
                let tableData = 5;

                /*
                let ids = this.props.query.places.map((item,index) => <td key={"de" + index}> {item.id}</td>);
                let name = this.props.query.places.map((item,index) => <td key={"de" + index}> {item.name}</td>);
                let lat = this.props.query.places.map((item,index) => <td key={"de" + index}> {item.latitude}</td>);
                let long = this.props.query.places.map((item,index) => <td key={"de" + index}> {item.longitude}</td>);
                */

                /*
                let dests = this.props.trip.places.map(
                    (item, index) => <td key={"de" + index}> {item.name} </td>);
                let dists = this.props.trip.distances.map(
                    (item, index) => <td key={"di" + index}> {item}</td>);

                if (dests.length > 0) {
                  dests.push(<td key={-1}> {dests[0].props.children} </td>);
                }


                let tableData = [];
                for (let i = 0; i < ids.length - 1; i++) {
                  tableData.push(this.renderRow(ids[i]),
                      false);
                }
                */

                return {ids, name, lat, long, tableData};
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