import React, {Component} from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
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

  makeStaff(img, name) {
    return (<div className="container px-2 py-1">
        <span>
        <img className="rounded-circle"
             src={img}
             style={{maxHeight: "75", border: "solid", borderWidth: "2px"}}/>
          <div className=""> {name} </div>
          </span>
      </div>);
  }

  render() {
    return (
        <div id="header" style={{backgroundColor: "#1E4D28"}}
             ref={(divElement) => this.divElement = divElement}>
          <div
              className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 align-self-left">
            <img className="img-fluid"
                 src="http://www.cs.colostate.edu/~davematt/logos/CS_unit_identifiers/CompSci-NS-CSU-1-Hrev.png"
                 style={{maxHeight: "50"}}/>
            <Button id="aboutpage" className="btn"
                    onClick={this.toggleStaffPage}><FaCog/></Button>
            <Popover placement="bottom"
                     isOpen={this.state.pageShown}
                     target="aboutpage"
                     toggle={this.toggleStaffPage}
                     style={{maxHeight: "600px", overflowY: "scroll", borderColor: "#59595B"}}>
              <div className="container m-0 p-0"
                   style={{border: "solid", borderColor: "#59595B"}}>
                <PopoverHeader style={{backgroundColor: "#C8C372", border:"none"}}
                               onClick={this.toggleStaff}>
                  Staff Information
                </PopoverHeader>
                <Collapse isOpen={this.state.staffShown}>
                  {this.makeStaff(
                      "http://www.cs.colostate.edu/~pbarstad/face.jpg",
                      "Paul Barstad")}
                  {this.makeStaff(
                      "http://www.cs.colostate.edu/~pbarstad/face.jpg",
                      "Isaac Gentz")}
                  {this.makeStaff(
                      "http://www.cs.colostate.edu/~jgoing/jgoingStaff.jpg",
                      "Justin Going")}
                  {this.makeStaff(
                      "http://www.cs.colostate.edu/~shaders/double.jpg",
                      "Samuel Kaessner")}
                </Collapse>

                <PopoverHeader style={{backgroundColor: "#C8C372", border:"none"}}
                               onClick={this.toggleInstructions}>
                  Instructions
                </PopoverHeader>
                <Collapse isOpen={this.state.instructionsShown}>
                  <h3>TripCo <small>t16 Dave Matthews Band</small></h3>
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
              </div>
            </Popover>
          </div>
        </div>
    );
  }
}

export default Header;
