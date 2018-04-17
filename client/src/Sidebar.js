import React, {Component} from 'react';
import Options from "./Options";
import Destinations from "./Destinations";
import LoadFile from "./LoadFile";
import { Collapse, Button, CardBody, Card, ListGroup, ListGroupItem } from 'reactstrap';

/*
 * Renders the sidebar that contains all the tools needed to edit and manipulate
 * a trip.
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleLoad = this.toggleLoad.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.state = {
        collapseSearch : false,
        collapseLoad : false,
        collapseOptions : false
    };
  }
  
  
  toggleSearch() {
    this.setState({ collapseSearch: !this.state.collapseSearch });
  }
  
  toggleOptions() {
    this.setState({ collapseOptions: !this.state.collapseOptions });
  }
  
  toggleLoad() {
    this.setState({ collapseLoad: !this.state.collapseLoad });
  }
  
  setTripTitle(e) {
      let newTitle = {
          title: "Untitled"
      };
    //this.props.updateTrip;
  }

  render() {
    return (
        <div id="sidebar"
             className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 align-self-left"
             style={{height: "1000px", maxHeight: "100%", overflowY: "scroll"}}>
            <div className="container my-2">                
                <div className="input-group" role="group">
                    <span className="input-group-btn">
                    <button className="btn btn-primary "
                            style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                            onClick={this.props.plan} type="button">Plan</button>
                    </span>

                    <input type="text" className="form-control" text="Untitled Trip" style={{background: "rgba(0,0,0,0)", border:"none"}}/>
                    
                    <span className="input-group-btn">
                    <button className="btn btn-primary "
                            style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                            onClick={this.props.saveTFFI} type="button">Save</button>
                    </span>
                </div>
            
                <ListGroup>
                    <ListGroupItem tag="button" href="#search" onClick={this.toggleSearch}>
                        Search For Destinations
                        
                    </ListGroupItem>
                <Collapse isOpen={this.state.collapseSearch}>
                    <Destinations trip={this.props.trip}
                                updateTrip={this.props.updateTrip}
                                query={this.props.query}
                                config={this.props.config}
                                updateQuery={this.props.updateQuery}
                                checkSQL={this.props.checkSQL}
                                addToTrip={this.props.addToTrip}
                                isInTrip={this.props.isInTrip}
                                addAllToTrip={this.props.addAllToTrip}
                                queryPlaces={this.props.queryPlaces}/>
                </Collapse>
                <ListGroupItem tag="button" href="#options" onClick={this.toggleOptions}>Options
                </ListGroupItem>
                <Collapse isOpen={this.state.collapseOptions}>
                    <Options options={this.props.trip.options}
                            updateOptions={this.props.updateOptions}
                            updateMapType={this.props.updateMapType} />
                </Collapse>
                    
                <ListGroupItem tag="button" href="#load" onClick={this.toggleLoad}>Load File
                </ListGroupItem>
                <Collapse isOpen={this.state.collapseLoad}>
                    <LoadFile updateTrip={this.props.updateTrip} trip={this.props.trip}/>
                </Collapse>
                </ListGroup>

            </div>
        </div>
    );
  }
}


/**
 * 
        <Button color="primary" onClick={this.toggleSearch}> Toggle </Button>
        <Collapse isOpen={this.state.collapseSearch}>
        
          <div className="container">
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                        <a data-toggle="collapse" href="#collapse1">Options</a>
                        </h4>
                    </div>
                <div id="collapse1" className="panel-collapse collapse">
                    <div className="panel-body">
                        <input type="text" className="asd" value="Label look like"/>
                    </div>
                </div>
                <div id="collapse2" className="panel-collapse collapse">
                    <div className="panel-body">Panel Body</div>
                    <div className="panel-footer">Panel Footer</div>
                </div>
            </div>
          
            <div className="row">
            
                <div className="input-group" role="group">
                    <span className="input-group-btn">
                    <button className="btn btn-primary "
                            style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                            onClick={this.props.plan} type="button">Plan</button>
                    </span>

                    <input type="text" className="form-control" text="Untitled Trip" style={{background: "rgba(0,0,0,0)", border:"none"}}/>
                    
                    <span className="input-group-btn">
                    <button className="btn btn-primary "
                            style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                            onClick={this.props.saveTFFI} type="button">Save</button>
                    </span>
                </div>
            </div>
            <div>
              <button className="btn btn-primary "
                      style={{border: "#1E4D2B", backgroundColor: "#1E4D2B"}}
                      onClick={this.props.reverseTrip} type="button">Reverse Trip
              </button>
            </div>
          </div>
          <div className="container">
              <div className="panel-group">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" href="#options_collapse">Options</a>
                    </h4>
                </div>
                <div id="options_collapse" className="panel-collapse collapse">
                    <div className="panel-body">
                        <Options options={this.props.trip.options}
                        updateOptions={this.props.updateOptions}
                        updateMapType={this.props.updateMapType} />
                    </div>
                </div>
            </div>
          </div>
          <div className="container">
            <Destinations trip={this.props.trip}
                            updateTrip={this.props.updateTrip}
                            query={this.props.query}
                            config={this.props.config}
                            updateQuery={this.props.updateQuery}
                            checkSQL={this.props.checkSQL}
                            addToTrip={this.props.addToTrip}
                            isInTrip={this.props.isInTrip}
                            addAllToTrip={this.props.addAllToTrip}
                            queryPlaces={this.props.queryPlaces}/>
          </div>
        </div>
    </Collapse>
    </div>*/


export default Sidebar;
