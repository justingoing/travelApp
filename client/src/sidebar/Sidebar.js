import React, {Component} from 'react';
import Options from "./Options";
import Destinations from "../Destinations";
import LoadFile from "./LoadFile";
import Save from "./Save";
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
    this.toggleSave = this.toggleSave.bind(this);

    this.state = {
      collapseSearch: false,
      collapseLoad: false,
      collapseOptions: false,
      collapseSave: false
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

  toggleSave() {
    this.setState({collapseSave: !this.state.collapseSave});
  }

  render() {
    return (
        <div id="sidebar"
             className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 align-self-left"
             style={{ maxHeight: "657px", overflowY: "scroll"}}>
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
                              plan={this.props.plan}
                              server={this.props.server}/>
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
                             onClick={this.toggleLoad}>Load Files
              </ListGroupItem>
              <Collapse isOpen={this.state.collapseLoad}>
                <LoadFile plan={this.props.plan} updateTrip={this.props.updateTrip}/>
              </Collapse>
              <ListGroupItem isOpen={this.state.collapseSave} tag="button" href="#save"
                             onClick={this.toggleSave}>Save Files
              </ListGroupItem>
              <Collapse isOpen={this.state.collapseSave}>
                <Save saveTFFI={this.props.saveTFFI}
                      saveKML={this.props.saveKML} map={this.props.trip.options.map}/>
              </Collapse>
            </ListGroup>
          </div>
        </div>
    );
  }
}

export default Sidebar;
