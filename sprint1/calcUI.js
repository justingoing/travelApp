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
        <input type="text" className="text-left form-control" id="long-in" placeholder="Longitude"/>
      </div>
    )
  }
}

class Latitude extends React.Component{
  render() {
    return (
     
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
        <input type="text" className="text-left form-control" id="lat-in" placeholder="Latitude"/>
      </div>
    )
  }
}

class Calc extends React.Component{
  render() {
    return (
      <div className="col-sm text-center">
      <br/>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" >Calculate!</button>
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

