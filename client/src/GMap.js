import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {withScriptjs, withGoogleMap,
  GoogleMap, Polyline, Marker} from 'react-google-maps';

class GMap extends Component {
  constructor(props) {
    super(props);
  }

  // Create our path from the places array
  makePath(places) {
    console.log("places ", places);

    let path = places.map(
        x => ({lat: Number(x.latitude), lng: Number(x.longitude)})
    );
    if (places.length > 0) {
      path.push({lat: Number(places[0].latitude), lng: Number(places[0].longitude)});
    }
    return path;
  }

  // Create our markers
  makeMarkers(places) {
    console.log("places ", places);
    let markers = places.map(
        x => <Marker position={{lat: Number(x.latitude), lng: Number(x.longitude)}}/>
    );
    return markers;
  }

  render() {
    const places = this.props.trip.places;
    return (
        <GoogleMap
            defaultCenter={{lat: 0, lng: 0}}
            defaultZoom={1}
        >
          <Polyline path={this.makePath(places)}
                    options={{strokeColor: 'DeepSkyBlue'}}
          />
          {this.makeMarkers(places)}
        </GoogleMap>
    );
  }
}

const TripMap = compose(
    withProps({
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?' +
      'key=' + "AIzaSyCY0lY58bSkzQwN3iUvYDXktPa4z_85LIg" +
      '&v=3.exp' +
      '&libraries=geometry,drawing,places',
      loadingElement: <div />,
      containerElement: <div/>,
      mapElement: <div style={{ height: `50%` }} />
    }),
    withScriptjs,
    withGoogleMap,
)(GMap);

export default TripMap;


