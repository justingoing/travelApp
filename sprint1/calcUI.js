/* First Attempt at Distance Calculator Site - Paul Barstad */



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

class Longitude extends React.Component{
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
        <input type="text" className="text-left form-control" id="long-in" placeholder="Longitude" pattern="([0-9]{1,3}°\s*[0-9]{1,2}\x27\s*[0-9]{1,2}\x22\s*[NESW]\s*){2}|([0-9]{1,2}°\s*[0-9]*\.?[0-9]+\x27\s*[NESW]\s*){2}|([+-]?[0-9]*\.?[0-9]+°\s*[NESW]\s*){2}|([+-]?[0-9]*\.?[0-9]+\s+[+-]?[0-9]*\.?[0-9]+\s*)/>
      </div>
    )
  }
}

class Latitude extends React.Component{
  render() {
    return (
     
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
        <input type="text" className="text-left form-control" id="lat-in" placeholder="Latitude" pattern="([0-9]{1,3}°\s*[0-9]{1,2}\x27\s*[0-9]{1,2}\x22\s*[NESW]\s*){2}|([0-9]{1,2}°\s*[0-9]*\.?[0-9]+\x27\s*[NESW]\s*){2}|([+-]?[0-9]*\.?[0-9]+°\s*[NESW]\s*){2}|([+-]?[0-9]*\.?[0-9]+\s+[+-]?[0-9]*\.?[0-9]+\s*)/>
      </div>
    )
  }
}

class Calc extends React.Component{
  render() {
    return (
      <div className="col-sm text-center">
      <br/>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" onClick={checkValidity.bind(this)}>Calculate!</button>
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
            <Latitude/>
            <Longitude/>
          </div>
          <br/>
          <Button/>
          <Calc/>
          <Answer/>
        </div>
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

