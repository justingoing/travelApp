import React, {Component} from 'react';
import {StickyContainer, Sticky} from 'react-sticky'


/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this)
  }

  getStyle(style) {
    let obj = Object.assign({minWidth: '100%', backgroundColor: "#1E4D28"}, style);
    console.log("obj", obj);
    return obj;
  }

  render() {
    return (
        <StickyContainer style={{minWidth: '100%'}}>
          <Sticky topOffset={80} style={{minWidth: '100%'}}>
            {
              ({
                style,

                // the following are also available but unused in this example
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => {
                return (
                    <div className="row" id="footer" style={this.getStyle(style)}>
                      <div className="col-6-md">
                        <img className="img-fluid pl-2 ml-4"
                             src="http://www.cs.colostate.edu/~davematt/logos/CSU_logos/CSU-Official-wrdmrk-357-617_Rev.png"
                             style={{maxHeight: "75"}}/>
                      </div>
                      <div className="col-6-xl mx-auto my-auto">
                        <p className="text-white my-0">
                          <b>&#8195;TripCo t{this.props.number} {this.props.name} &copy; Copyright
                            2018</b>
                        </p>
                      </div>
                    </div>
                )
              }
            }

          </Sticky>
        </StickyContainer>
    )
  }
}

export default Footer;