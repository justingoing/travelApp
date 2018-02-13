import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';

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
            <Header number={this.state.number} name={this.state.name}/>
            <Application />
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
