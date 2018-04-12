import React, {Component} from 'react';
import SearchTable from './SearchTable';
//import Checkbox from './Checkbox';

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */

class Destinations extends Component {
  constructor(props) {
    super(props);
    this.loadTFFI = this.loadTFFI.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

    loadTFFI(event) {
        var props = this.props;
        var reader = new FileReader();
        reader.onload = function(e) {
            var object = JSON.parse(reader.result);
            props.updateTrip(object);
        };
        reader.readAsText(event.target.files[0]);
    }

    searchResponse(){
      //POST request
      return fetch('http://' + location.host + '/query', {
          method: "POST",
          body: JSON.stringify(this.props.query)
      });
    }



    async sendSearch(){
        //get the search value, put it in query field, and send it
        //this.props.updateQuery(document.getElementById("mySearch").value);
        this.props.checkSQL(document.getElementById("mySearch").value);
        try{
            let searchResponse = await this.searchResponse();
            let searchTFFI = await searchResponse.json();
            if(searchTFFI.code == "400"){
              alert(searchTFFI.message);
            }else{
              this.props.updateQuery(searchTFFI);
            }
        }catch(err){
            console.error(err)
        }
    }

    makeChecks(){
        var addition = [];
        var f = this.props.config.filters;
        var vals = f["0"].values;
        for(let i = 0; i < vals.length; i++) {
            addition.push(<label><input type="checkbox"  onClick={(e) => this.check(vals[i])}/>{vals[i]}&emsp;</label>);
        }

        return addition;
    }
    check(name) {
        console.log("CHECK " + name);
        if(this.props.query.filters.length == 0) {
            console.log("no filters yet");
            let newQuery = this.props.query;
            //console.log(this.props.query);
            newQuery.filters = [{
                "attribute": "airports.type",
                "values": [name]
            }
            ];
            /*this.props.query.filters = {
                "attribute" : "airports.type",
                "values"    : [ name ]
            }*/
            this.props.updateQuery(newQuery);
            return;
        }

        for(let j = 0; j < this.props.query.filters["0"].values.length; j++) {
            //console.log(this.props.query.filters[j] + " vs " + name);
            if(this.props.query.filters["0"].values[j] == name) {
                console.log(name + " is already inside filters, should remove");
                let removeQuery = this.props.query;
                if(1 == this.props.query.filters["0"].values.length) {
                    removeQuery.filters.pop(); //if only one value then empty filters entirely
                    return;
                }
                else if(j == this.props.query.filters["0"].values.length -1 ) {
                    removeQuery.filters["0"].values.pop();
                }
                removeQuery.filters["0"].values.splice(j, 1);
                this.props.updateQuery(removeQuery);

                console.log("REMOVED " + this.props.query);
                return;
            }
            else {
                console.log(name + " not in filters, should add");
                let addQuery = this.props.query;
                addQuery.filters["0"].values.push(name);
                this.props.updateQuery(addQuery);
                console.log("ADDED " + this.props.query);
                return;
            }
        }
    }

  render() {
    const count = this.props.trip.places.length;
    var f = this.props.config.filters;
    var vals = f["0"].values;

    return (
        <div id="destinations" className="card">
          <div className="card-header text-white" style={{backgroundColor:"#1E4D2B"}}>
            Destinations
          </div>
          <div className="card-body">
            <p>Search destinations to add</p>
            <div className="filters">
              Airport Type:
              <br/>
                <div>{this.makeChecks()}</div>
            </div>
            <div className="input-group" role="group">
              <input type="text" className="form-control" id="mySearch" placeholder="Search for a place..."/>
              <button className="btn btn-primary " style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}} onClick={this.sendSearch} type="button">Search</button>
            </div>
            <br/>
            <SearchTable destinations={this.props.query} addToTrip={this.props.addToTrip} isInTrip={this.props.isInTrip} queryPlaces={this.props.queryPlaces} addAllToTrip={this.props.addAllToTrip}/>
          <br/>
            <p>Or load destinations from a file.</p>
            <div className="form-group" role="group">
                <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
            </div>
            <h5>There are {count} destinations. </h5>
          </div>
        </div>
    )
  }
}

export default Destinations;