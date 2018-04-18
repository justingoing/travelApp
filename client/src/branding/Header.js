import React, {Component} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import FaCog from 'react-icons/lib/fa/cog';

/*
 * Renders a text heading above the application with useful information.
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleStaffPage = this.toggleStaffPage.bind(this);

    this.state = {
      pageShown: false
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;

    this.props.updateSize({header: height})
    this.height = 0;

    console.log(height);
  }

  toggleStaffPage() {
    this.setState({pageShown : !this.state.pageShown});
  }

  makeStaff(img, name) {
    return (<div className="container px-0 py-1">
      <img className="pull-left pr-2"
           src={img}
           style={{maxHeight: "75"}}/>
      {name}
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
            <Button id="aboutpage" className="btn" onClick={this.toggleStaffPage}><FaCog/></Button>

            <Popover placement="bottom" isOpen={this.state.pageShown} target="aboutpage" toggle={this.toggleStaffPage}>
                <PopoverHeader>Staff Info</PopoverHeader>
                <PopoverBody>
                  {this.makeStaff("http://www.cs.colostate.edu/~pbarstad/face.jpg", "Paul Barstad")}
                  {this.makeStaff("http://www.cs.colostate.edu/~pbarstad/face.jpg", "Isaac Gentz")}
                  {this.makeStaff("http://www.cs.colostate.edu/~jgoing/jgoingStaff.jpg", "Justin Going")}
                  {this.makeStaff("http://www.cs.colostate.edu/~shaders/double.jpg", "Samuel Kaessner")}
                </PopoverBody>
            </Popover>
          </div>
        </div>
    );
  }
}

export default Header;
