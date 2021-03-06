import React, {Component} from 'react';
import Header from './branding/Header';
import Instructions from './Instructions'
import Application from './Application';
import Footer from './branding/Footer';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "16",
      name: "Dave Matthews Band"
    }
  }

  render() {
    return(
        <div id="tripco">
            <Application number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
