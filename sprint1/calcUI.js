/* First Attempt at Distance Calculator Site - Paul Barstad */

import {calculateGreatCircleDistance} from './distanceCalculator.js';
import {parseCoord} from './validator.js';
import {getLatitude} from './validator.js';
import {getLongitude} from './validator.js';

class Header extends React.Component{
  render() {
    return (
      <div className="jumbotron text-center">
        <h1>Dave Matthews Band - Distance Calculator</h1>
      </div>
    )
  }
}

class Button extends React.Component{
  render(){
    return(                               
      <div className="text-center">
        <div className="dropdown">
    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
      Select Distance type
    </button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Miles</a>
      <a className="dropdown-item" href="#">Kilometers</a>
  </div>
</div>
      </div>
    )
  }
}

class FirstCoordinate extends React.Component{
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
        <input type="text" required className="text-left form-control" id="cord1" placeholder="Coordinate 1" pattern="([+-]?[0-9]{1,3}°\s*[0-9]{1,2}\x27\s*[0-9]{1,2}\x22\s*[NSEW]\s*){2}|[+-]?([0-9]{1,2}°\s*[0-9]*\.?[0-9]+\x27\s*[NSEW]\s*){2}|([+-]?[0-9]*\.?[0-9]+°\s*[ENSW]\s*){2}|([+-]?[0-9]*\.?[0-9]+\s*){2}"/>
      </div>
    )
  }
}

class SecondCoordinate extends React.Component{
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
        <input type="text" required className="text-left form-control" id="cord2" placeholder="Coordinate 2" pattern="([+-]?[0-9]{1,3}°\s*[0-9]{1,2}\x27\s*[0-9]{1,2}\x22\s*[NEWS]\s*){2}|([+-]?[0-9]{1,2}°\s*[0-9]*\.?[0-9]+\x27\s*[NEWS]\s*){2}|([+-]?[0-9]*\.?[0-9]+°\s*[NEWS]\s*){2}|([+-]?[0-9]*\.?[0-9]+\s*){2}"/>
      </div>
    )
  }
}

class Calc extends React.Component{
  onClickLogic() {
    var shouldProcess = true;
    if(!document.getElementById('cord1').checkValidity())
    {
      window.alert("Please check the format of your first coordinate");
      shouldProcess = false;
    }
    if(!document.getElementById('cord2').checkValidity())
    {
      window.alert("Please check the format of your second coordinate");
      shouldProcess = false;
    }

    if(shouldProcess)
    {
      var lat1 = getLatitude(document.getElementById('cord1').value);
      var lon1 = getLongitude(document.getElementById('cord1').value);
      var lat2 = getLatitude(document.getElementById('cord2').value);
      var lon2 = getLongitude(document.getElementById('cord2').value);

      lat1 = parseCoord(lat1);
      lon1 = parseCoord(lon1);
      lat2 = parseCoord(lat2);
      lon2 = parseCoord(lon2);

      window.alert("lat1: " + lat1 + ", long1: " + lon1 + ", lat2: " + lat2 + ", long2: " + lon2); 
      /*calculateGreatCircleDistance(100, 60, 105, 62, true)*/
    }

  }

  render() {
    return (
      <div className="col-sm text-center">
      <br/>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" onClick={this.onClickLogic.bind(this)}>Calculate!</button>
      </div>
    )
  }
}


class Answer extends React.Component{
  render() {
    return (
      <div className="col offset-2 col-8 text-center">
       <br></br>
        Distance:
        <input type="text" className="text-left form-control mr-sm-2" disabled/>

      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
        <div className="container">
        <div>
          <Header/>
          <div className="row">
            <FirstCoordinate/>
            <SecondCoordinate/>
          </div>
          <br/>
          <Button/>
          <Calc/>
          <Answer/>
        </div>
        </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

