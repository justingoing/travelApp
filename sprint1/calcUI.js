/* First Attempt at Distance Calculator Site - Paul Barstad 

UI is not currently centered, might be easiest to left justify everything.

*/



class Header extends React.Component{
  render() {
    return (
      <div className="jumbotron text-center">
        <h1>Dave Matthews Band - Distance Calculator</h1>
      </div>
    )
  }
}

class Longitude extends React.Component{
  render() {
    return (
      <div className="col-md-4 text-center">
        Longitude:
        <input type="text" className="text-left form-control" />
      </div>
    )
  }
}

class Latitude extends React.Component{
  render() {
    return (
     
      <div className="col-4 text-center">
        Latitude:
        <input type="text" className="text-left form-control" />
      </div>
    )
  }
}

class Calc extends React.Component{
  render() {
    return (
      <div className="col-sm text-center">
        <br></br>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" >Calculate!</button>
      </div>
    )
  }
}

class Answer extends React.Component{
  render() {
    return (
      <div className="col-4 text-center">
        <br></br>
        Distance:
        <input type="text" className="text-left form-control mr-sm-2"/>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
        <div>
          <Header/>
          <div className="row">
            <Longitude/>
            <Latitude/>
          </div>
          <Calc/>
          <Answer/>
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));