import React, {Component} from 'react';

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
      return fetch(process.env.SERVICE_URL + '/query', {
          method: "POST",
          body: JSON.stringify(this.props.query)
      });
    }

    async sendSearch(){
        //get the search value, put it in query field, and send it
        this.props.updateQuery(document.getElementById("mySearch").value);
        try{
            let searchResponse = await this.searchResponse();
            let searchTFFI = await searchResponse.json();
            this.props.query.places = searchTFFI.places;
        }catch(err){
            console.error(err)
        }

        console.log("Query places are now: ");
        console.log(this.props.query.places);
    }

  render() {
    const count = this.props.trip.places.length;
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-dark text-white">
            Destinations
          </div>
          <div className="card-body">
              <p>Search destinations to add</p>
                  <div className="input-group" role="group">
                          <input type="text" className="form-control" id="mySearch" placeholder="Search for a place..."/>
                           <button className="btn btn-primary " style={{border: "#3E4551", backgroundColor: "#3E4551"}} onClick={this.sendSearch} type="button">Search</button>
                  </div>
                  <br/>
                  <p>Search Results</p>
                  <div>
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
                        {}
                      </tbody>
                     </table>
                  </div>
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