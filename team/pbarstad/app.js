/* ReactJS components to render the sample page */
/* Note the use of className rather than class for ReactJS */

class Header extends React.Component{
  render() {
    return (
      <div styleName="background:transparent" className="jumbotron text-center">
        <h1>Paul Barstad</h1>
          <h3>(303)-304-7073 </h3>
          <h3>pbarstad@rams.colostate.edu </h3>
          <h3>Fort Collins, CO </h3>
          <h3> <a href="http://www.cs.colostate.edu/~pbarstad">www.cs.colostate.edu/~pbarstad</a></h3> 
      </div>
    )
  }
}

class Objective extends React.Component {
  render() {
    return (
      <div className="row">

    <div className="col-md-6 text-center">
      <h2><u>Objective</u></h2>
      <h4> Seeking a Computer Science internship. Interested in Data Science and App Development. At Colorado State University I have been exposed to HTML, Python, R, Java, and C++.
      </h4> 
   
  </div>
  
  
    <div className="col-md-6 text-center">
      <h2><u>Education</u></h2>
      <h4> Studying Computer Science at Colorado State University </h4>
      <h4> <a href="https://github.com/pbarstad/Document-Retrieval">C++ Document Retrieval Project</a></h4> 
    </div>
  
</div>
    )
  }
}

class References extends React.Component{
  render() {
    return (
      <div styleName="background:transparent" className="jumbotron text-center">
<h2><u> References </u></h2>
  <ul className="list-group">
    <li className="list-group-item"> <b>Jim Mundle (303)-587-7546 </b> <br></br>
       Owner of Overdrive Raceway, Mentor during Toys for Tots
    </li>
  </ul>
    </div>
    )
  }
}

class Experience extends React.Component{
  render() {
    return (
     
  <div className="row">
  <div className="col-md-6 text-center">
<h2><u>Experience</u></h2>

<ul className="list-group">
  <li className="list-group-item"> <b>AMC Castle Rock 12 <i> December 2013 to August 2015 </i> </b> <br></br>
    Film Crew - Sold tickets and prepared concessions, as well as keep theaters presentable
     </li>
  <li className="list-group-item"> <b>Brunswick Zone XL Lone Tree <i> January 2015 to July 2015 </i> </b> <br></br>
    Guest Services - Assisted customers preparing for bowling
      </li>
  <li className="list-group-item"> <b>Overdrive Raceway <i> June 2016 to Present </i> </b> <br></br>
    Track Marshall - Instructed customers how to have a fun, safe time while go-karting
      </li>
  <li className="list-group-item"> <b>Top Line Contracting <i> January 2016 to Present </i> </b><br></br>
    Painter - Transformed the interior and exterior of homes and businesses
  </li>
</ul>
</div>
  
<div className="col-md-6 text-center">  
<h2><u> Leadership and Service </u></h2>
  <ul className="list-group">
    <li className="list-group-item"> <b>Toys for Tots <i> 2011 through 2014 </i> </b> <br></br>
       Reached out to the community for donations and toys each holiday season
        <br></br> Collected 40,000+ toys every year in Douglas County
        <br></br> Assisted in running the banquet celebrating each year's achievements
    </li>
     
    <li className="list-group-item"> <b>Youth Group Leader <i> 2011 through 2015 </i> </b> <br></br>
      4 Years representing my class thoughout high school
        Met monthly with other leaders to plan upcoming events
    </li>
  </ul>
 </div>
  </div>

    )
  }
}      

class Main extends React.Component {
  render() {
    return (
        <div>
          <Header/>
          <hr/>
          <Objective/>
          <hr/>
          <Experience/>
          <hr/>
          <References/>
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
