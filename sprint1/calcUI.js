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

class Longitude extends React.Component{
  render() {
    return (
      <div className="col-3 text-center">
        Longitude:
        <input type="text" className="text-left form-control" />
      </div>
    )
  }
}

class Latitude extends React.Component{
  render() {
    return (
     
      <div className="col-3 text-center">
        Latitude:
        <input type="text" className="text-left form-control" />
      </div>
    )
  }
}

class Miles extends React.Component{
  render() {
    return (
      <div className="col-sm text-center">
        <br></br>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Miles&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
      </div>
    )
  }
}

class Kilometers extends React.Component{
  render() {
    return (
      <div className="col-sm text-center">
        <br></br>
        <button className="btn btn-primary mr-sm-2" type="submit" value="submit" >Kilometers</button>  
      </div>
    )
  }
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 

class Answer extends React.Component{
  render() {
    return (
      <div className="col-3 text-center">
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
            <Miles/>
            <Kilometers/>
            
            <Answer/>
          </div>
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

