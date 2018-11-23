import React, { Component } from 'react';
import IpoModule from './IpoModule';
import base from '../functions/base';

class App extends Component {

  componentDidMount() {
    base.bindToState('/', { context: this, state: 'data' })
  }

  render() {
    return (
      <div className="App">
        <div>IPO Tables!</div>
        <IpoModule />
      </div>
    );
  }
}

export default App;
