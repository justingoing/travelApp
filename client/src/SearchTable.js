import React, {Component} from 'react';
import DestCard from "./DestCard";

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

    let tableData = [];

    for(let i = 0; i < ids.length; i++){
      console.log("Making new table");
      let temp = this.props.destinations.places[i];
      if(!this.props.isInTrip(temp.id)) {
        tableData.push(this.renderRow(i, ids[i], dests[i]), false);
        // store what's in the query vs. what's in the trip
        this.props.queryPlaces[temp.id] = this.props.destinations.places[i];
      }
    }
    console.log(this.props.queryPlaces);
    return {ids, dests, tableData};
  }

  addToTrip(key){
    console.log(this.props.destinations.places[key]);
    this.props.addToTrip(this.props.destinations.places[key]);
    this.props.plan();
  }

  moreInfo(key){
      alert("Name: " + this.props.destinations.places[key].name
            + " ID: " + this.props.destinations.places[key].id
            + "\nLatitude: " + this.props.destinations.places[key].latitude
            + "\nLongitude: " + this.props.destinations.places[key].longitude
            + "\nContinent: " + this.props.destinations.places[key].extraAttrs.continent
            + "\nCountry: " + this.props.destinations.places[key].extraAttrs.iso_country
            + "\nRegion: " + this.props.destinations.places[key].extraAttrs.iso_region
            + "\nMunicipality: " + this.props.destinations.places[key].extraAttrs.municipality
            + "\nType: " + this.props.destinations.places[key].extraAttrs.type
            + "\nElevation: " + this.props.destinations.places[key].extraAttrs.elevation


      );
  }

  renderRow(key, ids, dests, selected) {
     let addition = (
              <td className="align-right"><span>
                  <div className="btn-group btn-group-sm" role="group">
                <button className="btn btn-primary " style={{border: "#FFF", backgroundColor: "#59595B"}}
                        onClick={(e) => this.addToTrip(key)}
                        title="Add to your trip">+</button>
                <button className="btn btn-primary " style={{border: "#FFF", backgroundColor: "#59595B"}}
                        onClick={(e) => this.moreInfo(key)}
                        title="See more information">...</button>
                 </div>
              </span></td>
          );

      let opacity = selected ? 0.3 : 1.0;

      return (<tr key={key} style={{opacity: opacity}}>{ids}{dests}{addition}</tr>);
  }


  render(){
    this.table = this.createTable();
    return(
      <div id="SearchTable">
        <button className="btn btn-primary " style={{border: "#FFF", backgroundColor: "#59595B"}} onClick={(e) => this.props.addAllToTrip()}>+ All</button>
        <br/>
        <div className="table-responsive">
            <table className="table table-responsive" style={{maxHeight: "30%", overflow: "scroll", display: "inline-block"}}>
            <thead>
            <tr className="table-info">
                <th className="align-middle" style={{color: "#FFF", backgroundColor: "#1E4D2B"}}>ID</th>
                <th className="align-middle" style={{color: "#FFF", backgroundColor: "#1E4D2B"}}>Name</th>
                <th className="align-right" style={{color: "#FFF", backgroundColor: "#1E4D2B"}}>Options</th>
            </tr>
            </thead>
            <tbody>
            {this.table.tableData}
            </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default SearchTable;
