class Header extends React.Component{
  render(){
    return(
      <div className ="jumbotron text-center">
        <h1>Justin Going </h1>
        <p>1672 Riverside Ave.
        <br/> Fort Collins, CO, 80525
        <br/>Cell: 810-580-8105
        <br/> <a href="url">justin.j.going@gmail.com </a> </p>
      </div>
    );
  }
}

class Body1 extends React.Component{
  render(){
    return(
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <h2> Objective </h2>
              <p> Seeking full time employment at a company that will further my professional development. </p>
          </div>
         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h2> Education</h2>
            <ul>
              <li> U.S. Air Force Space Based Infrared Systems Mission School, Jul 2007 </li>
              <li> U.S. Air Force Airman Leadership School, Oct 2011 </li>
              <li> Colorado State University, Computer Science, Jan 2014 - Present </li>
            </ul>
           </div>
          </div>
    );
  }
}

class Body2 extends React.Component{
  render(){
    return(
      <div>
  <h2> Experience </h2>
  <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
      <p> 2007-2011 Mission Crew Chief, Buckley AFB, U.S. Air Force </p>
      <ul>
        <li> Coordinated a 6 man crew operating the USAF 16 billion dollar Space Based Infrared System </li>
        <li> Meticulously processed and reported over 700 infrared events resulting in the on time delivery of accurate missile warning data to national leadership </li>
        <li> Lead crew recognized as the best crew of the quarter three times and contributed to the unit being recognized as best space warning squadron in the Air Force twice </li>
      </ul>
    </div>
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
      <p> 2011-2013 Missile Warning Crew Chief, Cheyenne Mountain AFS, U.S. Air Force </p>
      <ul>
        <li> Operated and Managed the United States Air Force's Multi-Billion dollar Missile warning network with zero errors on duty</li>
        <li> Instructed and mentored 14 trainees through job certification resulting in a strengthened work force</li>
        <li> Flawlessly processed and reported over 1000+ events contributing to the defense of the United States and deployed forces worldwide </li>
      </ul>
    </div>
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
      <p> 2014-Present Weekender-Line Operator, Anheuser-Busch, Fort Collins, CO </p>
      <ul>
        <li> Employed for the past two years in a fast paced manufacturing environment with zero safety incidents
        </li>
        <li> Qualified in 4 different positions and responsible for the successful production of thousands of cases an hour </li>
        <li> Constantly troubleshooting and resolving problems with high value equipment to maintain nonstop production </li>
      </ul>
    </div>
  </div>
        </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className = "container">
        <Header/>
        <Body1/>
        <Body2/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
