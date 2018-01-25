/* ReactJS components to render the sample page */
/* Note the use of className rather than class for ReactJS */

class Intro extends React.Component{
  render() {
    return (
      <div className="jumbotron text-center">
  <h1>Samuel Kaessner</h1>

  <ul className="list-inline">
    <li className="list-inline-item">(303)-718-4161</li>
    <li className="list-inline-item"><a href="mailto:#">samuel.kaessner@gmail.com</a></li>
    <li className="list-inline-item">Fort Collins, Colorado</li>
  </ul>
</div>
    )
  }
}

class Summary extends React.Component{
  render() {
    return (
      <div className="jumbotron">
  <h2>Summary</h2>
  <p>Computer Science student seeks employment in an aerospace or defense job. </p>
</div>
    )
  }
}

class Body extends React.Component {
  render() {
    return (<div className="jumbotron">
  <div className="row">
    <WorkExperience />
    <Education />
  </div>
</div>)
  }
}

class WorkExperience extends React.Component{
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
      <h2>Work Experience</h2>
      <ul>
        <li><ul>
          <h3>Line Cook - Hilton Hotel, Fort Collins - 2017</h3>
          <p>Cooked meals for guests in restaurant. </p>
          <p>Prepped food and ensured adequate levels of product was maintained.</p>
        </ul></li>

        <li><ul>
          <h3>Professional Services Intern - Ricoh USA, Boulder - 2017</h3>
          <p>Developed tool for comparing two installations of flagship product. </p>
          <p>Defined processes for testing customer defects and creating test environments.</p>
          <p>Created automation software, balancing ease of use with flexibility.</p>
          <p>Improved trust between subsidiary compary and Ricoh. </p>
          <p>Applied customer service skills in the professional workplace. </p>
        </ul></li>

        <li><ul>
          <h3>Server / Host - Village Inn, Fort Collins / Longmont - 2016-2017</h3>
          <p>Started as a host and worked up to a serving position in three months.
          </p>
          <p>Performed opening tasks, ensuring that the restaurant was ready for business. </p>
          <p>Developed customer service and service recovery skills.</p>
          <p>Memorized names, faces, and favorite meals of regular guests. </p>
          <p>Provided helpful menu insight for guests. </p>
        </ul></li>

        <li><ul>
          <h3>Poultry Farmer - Sam's Eggs, Longmont - 2010 - 2015</h3>
          <p>Started business and managed finances.
          </p>
          <p>Sold eggs and built long-term customer relationships.</p>
        </ul></li>

        <li><ul>
          <h3>Lawn Technician Assistant - Kip Doan, Longmont - 2013 - 2014</h3>
          <p>Mowed lawns, loaded equipment, and removed hedge trimmings.
          </p>
        </ul></li>
      </ul>

      <hr />
    </div>
    )
  }
}

class Education extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
      <h2>Education</h2>
      <ul>

        <li><ul>
          <h3>Colorado State University - 4.0 GPA - 2016 - 2018</h3>
          <p>Studying Computer Science, with a minor in mathematics.
          </p>
        </ul></li>

        <li><ul>
          <h3>Front Range Community College - 4.0 GPA - 2015</h3>
          <p>Earned Phi Theta Kappa honor society membership.
          </p>
          <p>Excelled in communication classes.
          </p>
        </ul></li>

        <p></p>

      </ul>
      <hr />
    </div>
      )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <Intro />
        <hr />
        <Summary />
        <hr />
        <Body />
      </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
