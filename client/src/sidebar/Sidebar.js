import React, {Component} from 'react';
import Options from "./Options";
import Destinations from "../Destinations";
import LoadFile from "./LoadFile";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import TripInfo from "./TripInfo";

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
      collapseSearch: false,
      collapseLoad: false,
      collapseOptions: false
    };
  }

  toggleSearch() {
    this.setState({collapseSearch: !this.state.collapseSearch});
  }

  toggleOptions() {
    this.setState({collapseOptions: !this.state.collapseOptions});
  }

  toggleLoad() {
    this.setState({collapseLoad: !this.state.collapseLoad});
  }

  render() {


    return (
        <div id="sidebar"
             className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 align-self-left"
             style={{height: "1500px", maxHeight: "100%", overflowY: "scroll"}}>
          <div className="container px-4">
            <TripInfo updateTrip={this.props.updateTrip} trip={this.props.trip}/>
            <ListGroup>
              <ListGroupItem tag="button" href="#search"
                             onClick={this.toggleSearch}>
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
                              queryPlaces={this.props.queryPlaces}
                              plan={this.props.plan}/>
              </Collapse>
              <ListGroupItem tag="button" href="#options"
                             onClick={this.toggleOptions}>Options
              </ListGroupItem>
              <Collapse isOpen={this.state.collapseOptions}>
                <Options options={this.props.trip.options}
                         updateOptions={this.props.updateOptions}
                         updateMapType={this.props.updateMapType}/>
              </Collapse>

              <ListGroupItem tag="button" href="#load"
                             onClick={this.toggleLoad}>Load File
              </ListGroupItem>
              <Collapse isOpen={this.state.collapseLoad}>
                <LoadFile updateTrip={this.props.updateTrip}/>
              </Collapse>
              <ListGroupItem tag="button" href="#save"
                             onClick={this.props.saveTFFI}>Save File
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
    );
  }
}

export default Sidebar;
