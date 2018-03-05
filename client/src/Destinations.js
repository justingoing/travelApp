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
        //get the search value
        var search = document.getElementById("mySearch").value;
        //update query with the search
        this.props.updateQuery(search);
        //send request to server
        try{
            let searchResponse = await this.searchResponse(search);
            let searchTFFI = await searchResponse.json();
            console.log(searchTFFI)
            //TODO handle the response from server
        }catch(err){
            console.error(err)
        }
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
              <form>
                  <div>
                      <input type="search" id="mySearch" name="q" placeholder="Enter the name of a Place..."/>
                      <span className="validity"></span>
                      <button type="submit" onClick={this.sendSearch}>Search!</button>
                  </div>
              </form>
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