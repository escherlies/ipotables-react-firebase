import React, { Component } from 'react';
import IpoModule from './IpoModule';
import base from '../functions/base';
import _ from 'lodash'

class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    base.bindToState('/', { context: this, state: 'data' })
  }

  render() {
    console.log(`this.state`, this.state)

    return (
      <div className="App">
        <div>IPO Tables!</div>
        <IpoModule things={_.cloneDeep(this.state.data.things)} />
      </div>
    );
  }
}

export default App;
