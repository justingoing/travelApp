import React, {Component} from 'react';
import {
  Button,
  Popover,
  ListGroupItem,
  ListGroup,
  Collapse
} from 'reactstrap';
import FaCog from 'react-icons/lib/fa/cog';

/*
 * Renders a text heading above the application with useful information.
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleStaffPage = this.toggleStaffPage.bind(this);
    this.toggleStaff = this.toggleStaff.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);

    this.state = {
      pageShown: false,
      staffShown: false,
      instructionsShown: false
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;

    this.props.updateSize({header: height})
    this.height = 0;

    console.log(height);
  }

  toggleStaff() {
    this.setState({staffShown: !this.state.staffShown});
  }

  toggleInstructions() {
    this.setState({instructionsShown: !this.state.instructionsShown});
  }

  toggleStaffPage() {
    this.setState({pageShown: !this.state.pageShown});
  }

  makeStaff(img, link, name) {
    return (<div className="container px-2 py-0">
        <div className="row pl-2">
          <img className="rounded-circle"
             src={img}
             style={{maxHeight: "75", border: "solid", borderWidth: "2px"}}/>
          <div className="ml-3" style={{margin: "auto"}}>
            <a href={link} style={{textAlign:"center", color:"#59595B"}}>{name}</a>
          </div>
        </div>
      </div>);
  }

  render() {
    return (
        <div id="header" style={{backgroundColor: "#1E4D28"}}
             ref={(divElement) => this.divElement = divElement}>
          <div className="row">

            <div className="col-10">
              <img className="img-fluid"
                   src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png"
                   style={{maxHeight: "50"}}/>
            </div>

            <div className="col-1 align-self-right" style={{margin: "auto", marginRight: "15px"}}>
              <Button className="btn float-right p-2"
                      id="aboutpage"
                      onClick={this.toggleStaffPage}
                      style={{backgroundColor:"rgba(0,0,0,0)", border:"none"}}
            ><FaCog/></Button>
            </div>

            <Popover placement="bottom"
                     isOpen={this.state.pageShown}
                     target="aboutpage"
                     toggle={this.toggleStaffPage}
                     style={{maxHeight: "600px",
                       overflowY: "scroll", fontWeight: "bold", maxWidth: "250px"}}>
                <ListGroup>
                  <ListGroupItem className="px-2"
                                 style={{backgroundColor: "#C8C372", width: "250px", color: "black"}}
                                 onClick={this.toggleStaff}>
                    Staff Information
                  </ListGroupItem>
                  <Collapse className="px-3 py-2" isOpen={this.state.staffShown}>
                    {this.makeStaff(
                        "http://www.cs.colostate.edu/~pbarstad/face.jpg",
                        "http://www.cs.colostate.edu/~pbarstad/",
                        "Paul Barstad")}<hr style={{margin: "5px"}}/>
                    {this.makeStaff(
                        "http://www.cs.colostate.edu/~ikegentz/pic.jpg",
                        "http://www.cs.colostate.edu/~ikegentz/",
                        "Isaac Gentz")}<hr style={{margin: "5px"}}/>
                    {this.makeStaff(
                        "http://www.cs.colostate.edu/~jgoing/jgoingStaff.jpg",
                        "http://www.cs.colostate.edu/~jgoing/",
                        "Justin Going")}<hr style={{margin: "5px"}}/>
                    {this.makeStaff(
                        "http://www.cs.colostate.edu/~shaders/double.jpg",
                        "http://www.cs.colostate.edu/~shaders/",
                        "Samuel Kaessner")}
                  </Collapse>

                  <ListGroupItem className="px-2"
                                 style={{backgroundColor: "#C8C372", width: "250px"}}
                                 onClick={this.toggleInstructions}>
                    Instructions
                  </ListGroupItem>
                  <Collapse className="p-2" isOpen={this.state.instructionsShown}>
                    <p><strong> Team 16 - The Dave Matthews Band </strong></p>
                    <br/>
                    <p>"Want to travel far and wide?"</p>
                    <ol>
                      <li>
                        Choose options for trip planning, information to display
                        about locations,
                        and how the trip map and itinerary should be saved.
                      </li>
                      <li>
                        Choose your destinations by loading existing sets of
                        destinations or
                        find more in an extensive database of locations
                        worldwide.
                      </li>
                      <li>
                        Plan the trip with the options you selected.
                        Review and revise the trip origin and order.
                        Save the trip map and itinerary for future reference.
                      </li>
                    </ol>
                  </Collapse>
                </ListGroup>
            </Popover>
          </div>
        </div>
    );
  }
}

export default Header;
