/* ReactJS components to render the sample page */
/* Note the use of className rather than class for ReactJS */

class Header extends React.Component{
  render() {
    return (
      <div>
      <div className="row">
        <h1>Isaac Gentz</h1>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-4 text-center">Sterling, CO 80751</div>
        <div className="col-sm-4 text-center">(303)-895-8004</div>
        <div className="col-sm-4 text-center">isaac.gentz@outlook.com</div>
      </div>
      </div>
    )
  }
}

class Body_Education extends React.Component {
  render() {
    return (
      <div>
        <h2>Education</h2>
        <hr/>
        <div className="row">
          <div className="col-lg-6 col--12 text-center">
            <div className="jumbotron text-center">        
                <div className="row">
                  <div className="col-sm-8">
                    <div className="row">
                      <div className="col-sm-12"><h3>Colorado State University</h3></div>
                      <div className="col-sm-12"><h5>BS Computer Science | August 2016 - May 2019</h5></div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <img src="http://ccaa.colostate.edu/img/csu.png" alt="CSU Logo" width="80" height="80"></img>
                </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col--12 col-md-6 col-xl-4 text-left">
                    <ul styleName="list-style-type:disc">
                      <li>Web Development</li>
                      <li>OS Programming</li>
                      <li>Databases</li>
                      <li>Networking</li>
                      <li>Algorithms</li>
                    </ul>
                  </div>
                  <div className="col--12 col-md-6 col-xl-4 text-left">
                    <ul styleName="list-style-type:disc">
                      <li>Calculus</li>
                      <li>Linear Algebra</li>
                      <li>Physics</li>
                      <li>GIS</li>
                    </ul>
                  </div>
                  <div className="col--12 col-md-6 col-xl-4 text-left">
                    <ul styleName="list-style-type:disc">
                      <li>Business</li>
                      <li>Real Estate</li>
                      <li>Writing</li>
                      <li>Comunication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          <div className="col-lg-6 col--12 text-center">
            <div className="jumbotron text-center">
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-12"><h3>DigiPen Institute of Technology</h3></div>
                    <div className="col-sm-12"><h5>BS Computer Science | August 2014 - May 2016</h5></div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <img src="http://www.therookies.co/media/reviews/photos/thumbnail/200x200c/4e/dd/ca/139846-digipen-institute-of-technology-58-1502588373.png" alt="DigiPen Logo" width="80" height="80"></img>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col--12 col-md-6 col-xl-4 text-left">
                  <ul styleName="list-styleName-type:disc">
                    <li>Game Engines</li>
                    <li>Algorithms</li>
                    <li>Datastructures</li>
                    <li>Linking and Compiling</li>
                    <li>Memory Management</li>
                  </ul>
                </div>
                <div className="col--12 col-md-6 col-xl-4 text-left">
                  <ul styleName="list-styleName-type:disc">
                    <li>Calculus</li>
                    <li>Linear Algebra</li>
                    <li>Physics</li>
                    <li>Advanced Physics</li>
                  </ul>
                </div>
                <div className="col--12 col-md-6 col-xl-4 text-left">
                  <ul styleName="list-styleName-type:disc">
                    <li>Team Management</li>
                    <li>Writing</li>
                    <li>Comunication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Body_Experience extends React.Component {
  render() {
    return (
      <div>
        <h2>Experience</h2>
        <hr/>
    <div className="row">
      <div className="col-lg-6 col--12 text-center">
        <div className="jumbotron text-center">
          <div className="row">
            <div className="col--12 col-xl-8">
              <div className="row">
                <div className="col-sm-12"><h3>Hewlett Packard Enterprise</h3></div>
                <div className="col-sm-12"><h5>Build and Test Engineer | May 2017 - Present</h5></div>
              </div>
            </div>
            <div className="col--12 col-xl-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Hewlett_Packard_Enterprise_logo.svg/1000px-Hewlett_Packard_Enterprise_logo.svg.png" alt="HPE Logo" width="191" height="80"></img>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Manage, protect, and inventory IT infrastructure using scripting and automation 
            </div>
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Increase team productivity using new technologies 
            </div>
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Push custom tools, scripts, and documentation to large team repositories spanning multiple countries 
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col--12 text-center">
        <div className="jumbotron text-center">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-12"><h3>CSU Engineering Network Services</h3></div>
                <div className="col-sm-12"><h5>August 2016 - May 2017</h5></div>
              </div>
            </div>
            <div className="col-sm-4">
              <img src="https://pbs.twimg.com/profile_images/577808730/ENS_Account_Picture_400x400.jpg" alt="ENS Logo" width="80" height="80"></img>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Repair and install computers, printers, telephones, and servers for students and faculty on the Colorado State campus 
            </div>
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Articulate problems and solutions to students and faculty in a clear and easily-understood manner 
            </div>
            <div className="col--12 mb-3 col-md-6 mb-3 col-xl-4 text-left">
              Develop preventative maintenance practices for university infrastructure with fellow technicians 
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      )
    }
  }

class Body_Skills extends React.Component {
  render() {
    return (
        <div>
          <h2>Skills - Ablities - Tools</h2>
          <hr/>
        <div className="row">
          <div className="col-xl-3 col-lg-4 mb-3 col-sm6 mb-3 col--12 mb-3">
            <div className="jumbotron">
              <div className="row">
                <h3>Technology</h3>
              </div>
              <hr/>
              <div className="row">
                <ul styleName="list-styleName-type:disc">
                  <li>Understanding of computer hardware and networking concepts </li>
                  <li>Working knowledge of programming, scripting, and software design concepts </li>
                  <li>Industry standard tools</li>
                  <ul styleName="list-styleName-type:circle">
                    <li>C/C++</li>
                    <li>Java</li>
                    <li>Python</li>
                    <li>git</li>
                    <li>SQL</li>
                    <li>Docker</li>
                    <li>VMWare</li>
                    <li>Jenkins</li>
                    <li>Boostrap</li>
                    <li>ReactJS</li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 mb-3 col-sm6 mb-3 col--12 mb-3">
            <div className="jumbotron">
              <div className="row">
                <h3>Business, Real Estate</h3>
              </div>
              <hr/>
              <div className="row">
                <ul styleName="list-styleName-type:disc">
                  <li>Acquired rental properties as Vice President of VeriQuest Ltd, a family-owned real estate company </li>
                  <li>Financed mortgage for mobile home buyer, through VeriQuest </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 mb-3 col-sm6 mb-3 col--12 mb-3">
            <div className="jumbotron">
              <div className="row">
                <h3>Communication</h3>
              </div>
              <hr/>
              <div className="row">
                <ul styleName="list-styleName-type:disc">
                  <li>Strong verbal and articulation skills. Ability to communicate technical concepts to those in other fields</li>
                  <li>Background with large software development teams. Effective collaborator for team goals and tasks </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 mb-3 col-sm6 mb-3 col--12 mb-3">
            <div className="jumbotron">
              <div className="row">
                <h3>Critical Thinking</h3>
              </div>
              <hr/>
              <div className="row">
                <ul styleName="list-styleName-type:disc">
                  <li>Ability to think outside the box due to rural upbringing and hands on work experience</li>
                  <li>Open to new ideas and experiences as a result of a diverse educational background </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <Header />
        </div>
      
        <div className="container-fluid">
          <Body_Education />
        </div>
        
        <div className="container-fluid">
          <Body_Experience />
        </div>
        
        <div className="container-fluid">
          <Body_Skills />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
