import React, { Component } from 'react';
import base from '../functions/base';
import _ from 'lodash'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import IpoModulesList from './ipo-modules/IpoModulesList';
import IpoModule from './ipo-modules/IpoModule';
import ThingsList from './ipo-things/ThingsList';
import Thing from './ipo-things/Thing';
import Home from './Home';
import NavHeader from './header/NavHeader';
import Breadcrums from './Breadcrums';
import Login from './Login';
import firebaseApp from '../functions/firebaseApp';

class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    base.bindToState('/', { context: this, state: 'data' })
    
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('User signed in')
      } else {
        console.log('User logged out')

      }
    });
  }

  render() {
    const things = _.cloneDeep(this.state.data.things)
    const modules = _.cloneDeep(this.state.data.modules)

    return (
      <BrowserRouter>
        <div className="App" >

          <NavHeader />

          <Breadcrums data={{ things, modules }} />
          
          <div style={{ padding: 15, maxWidth: 768, margin: 'auto' }}>

            <Route path="/login" component={Login}/>

            <Route exact path='/' render={({ history }) => <Home modules={modules} context={this} createNewModule={title => history.push(`/modules/add-new-module/${title}`)} />} />

            <Route exact path='/modules' render={() => <IpoModulesList modules={modules} readOnly={true} />} />
            <Route exact path='/things' render={() => <ThingsList things={things} readOnly={true} />} />
            <Route exact path='/things/:thingKey' render={({ match }) => <Thing thing={_.get(things, match.params.thingKey)} modules={modules} />} />

            <Switch>
              <Route exact path='/modules/add-new-module/:moduleTitle' render={({ match, history }) => <IpoModule things={things} goBack={() => history.push('/modules')} module={{ title: match.params.moduleTitle }} />} />
              <Route exact path='/modules/add-new-module' render={({ history }) => <IpoModule things={things} goBack={() => history.push('/modules')} />} />
              <Route exact path='/modules/:moduleKey/edit' render={({ match, history }) => <IpoModule moduleKey={match.params.moduleKey} things={things} module={_.get(modules, match.params.moduleKey)} goBack={() => history.push('/modules')} />} />
              <Route exact path='/modules/:moduleKey' render={({ match, history }) => <IpoModule moduleKey={match.params.moduleKey} things={things} readOnly={true} module={_.get(modules, match.params.moduleKey)} navigateToModule={() => history.push(`/modules/${match.params.moduleKey}/edit`)} />} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;





