import React, {Component} from 'react';
import GoogleMap from './GMap';

/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.trip.options.map === "kml" || !this.props.trip.options.map) {
      const places = this.props.trip.places;
      return (
          <GoogleMap trip={this.props.trip} />
      );
    } else {
      let svgHeader = 'data:image/svg+xml;charset=UTF-8,';
      let svgData = this.props.trip.map;
      return (
          <figure className="figure" id="map">
            <img className="figure-img img-fluid" alt="Map"
                 src={svgHeader.concat(svgData)}/>
          </figure>
      )
    }
  }
}

export default Map;