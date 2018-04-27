import React, {Component} from 'react';
import SearchTable from './SearchTable';

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
    this.sendSearch = this.sendSearch.bind(this);
  }

    searchResponse(){
      //POST request
      return fetch('http://' + this.props.server + '/query', {
          method: "POST",
          body: JSON.stringify(this.props.query),
          header: {'Access-Control-Allow-Origin':'*'}
      });
    }

    async sendSearch(){
        //get the search value, put it in query field, and send it
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
        for(let a = 0; a < f.length; a++) {
            var test = a;
            var vals = f[test].values;
            addition.push(f[test].attribute);
            for(let i = 0; i < vals.length; i++) {
                //console.log(f[test].attribute + " " + vals[i]);
                addition.push(<label><input type="checkbox"  onClick={(e) => this.check(f[a].values[i], f[a].attribute)}/>{vals[i]}&emsp;</label>);
            }
        }
        return addition;
    }
    check(name, attrib) {
        //console.log("check called on " + name + " with " + attrib);
        if(this.props.query.filters.length == 0) {
            //console.log("NO FILTERS YET, adding " + name + " underneath " + attrib);
            let newQuery = this.props.query;
            newQuery.filters = [{
                "attribute": attrib,
                "values": [name]
            }
            ];
            this.props.updateQuery(newQuery);
            return;
        }

        for(let s = 0; s < this.props.query.filters.length; s++) {
            if(this.props.query.filters[s].attribute == attrib){
                for(let t = 0; t < this.props.query.filters[s].values.length; t++){
                    if(name == this.props.query.filters[s].values[t]) {
                        //Found attribute with name already
                        let removeQuery = this.props.query;
                        if(1 == this.props.query.filters[s].values.length) {
                            if(s == this.props.query.filters.length-1) {
                                removeQuery.filters.pop(); //if only one value then delete entire attribute
                                return;
                            }
                            else {
                                removeQuery.filters.splice(s,1);
                                //not at end so cannot pop attribute off
                            }
                        }
                        else if(t == this.props.query.filters[s].values.length -1 ) {
                            removeQuery.filters[s].values.pop();
                        }
                        else {
                            removeQuery.filters[s].values.splice(t, 1);
                            this.props.updateQuery(removeQuery);
                            return;
                        }
                    }
                    else if(t == this.props.query.filters[s].values.length-1) {
                        //Attribute found but new value
                        let addQuery = this.props.query;
                        addQuery.filters[s].values.push(name);
                        this.props.updateQuery(addQuery);
                        return;
                    }
                }
            }
            else if(s == this.props.query.filters.length-1) {
                //At end of filters without finding attribute
                let newQuery = this.props.query;
                newQuery.filters.push({
                    "attribute": attrib,
                    "values": [name]
                });
                //console.log("adding " + attrib + " with " + name);
                this.props.updateQuery(newQuery);
                return;
            }
        }

        /*for(let s = 0; s < this.props.query.filters.length; s++) {
            if(this.props.query.filters[s].attribute == attrib) { //if it finds the attribute already...
                for(let j = 0; j < this.props.query.filters[s].values.length; j++) {
                    if(this.props.query.filters[s].values[j] == name) {
                        let removeQuery = this.props.query;
                        if(1 == this.props.query.filters[s].values.length) {
                            System.out.println("REMOVING when size 1")
                            removeQuery.filters[s].pop(); //if only one value then empty filters entirely
                            return;
                        }
                        else if(j == this.props.query.filters[s].values.length -1 ) {
                            System.out.println("REMOVING from end")
                            removeQuery.filters[s].values.pop();
                        }
                        System.out.println("REMOVING from middle")
                        removeQuery.filters[s].values.splice(j, 1);
                        this.props.updateQuery(removeQuery);
                        return;
                    }
                    else {
                        System.out.println("ADDING to end because not in yet")
                        let addQuery = this.props.query;
                        addQuery.filters[s].values.push(name);
                        this.props.updateQuery(addQuery);
                        return;
                    }
                }
            }
            else if(s == this.props.query.length-1) { //no more filters to check so need to add new attribute
                let newQuery = this.props.query;
                newQuery.filters.push({
                    "attribute": attrib,
                    "values": [name]
                });
                this.props.updateQuery(newQuery);
                return;
            }
        }*/
    }

  render() {
    return (
        <div id="destinations" className="card">
          <div className="card-body">
            <div className="input-group" role="group">
              <input type="text" className="form-control" id="mySearch" placeholder="Search for a place..."/>
              <button className="btn btn-primary " style={{border: "#FFF", backgroundColor: "#59595B"}} onClick={this.sendSearch} type="button">Search</button>
            </div>

            <div className="filters">
              Filter by:
                <br/>
                <div>{this.makeChecks()}</div>
            </div>
            <br/>
            <SearchTable destinations={this.props.query} addToTrip={this.props.addToTrip}
            isInTrip={this.props.isInTrip} queryPlaces={this.props.queryPlaces}
            plan={this.props.plan} addAllToTrip={this.props.addAllToTrip}/>
          </div>
        </div>
    );
  }
}

export default Destinations;
