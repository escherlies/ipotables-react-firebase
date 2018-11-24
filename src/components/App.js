import React, { Component } from 'react';
import base from '../functions/base';
import _ from 'lodash'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHockeyPuck, faHome } from '@fortawesome/free-solid-svg-icons';
import IpoModulesList from './ipo-modules/IpoModulesList';
import ButtonColored from './ui/buttons/ButtonColored';
import IpoModule from './ipo-modules/IpoModule';
import ThingsList from './ipo-things/ThingsList';
import Thing from './ipo-things/Thing';
import Home from './Home';
import Logo from '../assets/logo.png'

class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    base.bindToState('/', { context: this, state: 'data' })
  }

  render() {
    const things = _.cloneDeep(this.state.data.things)
    const modules = _.cloneDeep(this.state.data.modules)

    return (
      <BrowserRouter>
        <div className="App" style={{ padding: 8, maxWidth: 800 }}>

          <Route path='/' render={() => <img src={Logo} alt="ipo logo" style={{ height: 75, objectFit: 'contain' }} />} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>

            <Route path='/:nav' component={HomeButton} />
            <Route path='/:nav/:nav' component={BackButton} />
          </div>

          <h1>IPO Tables</h1>

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
      </BrowserRouter>
    );
  }
}

export default App;





const HomeButton = props => <div style={{ width: 120, margin: 5 }}>
  <ButtonColored
    title='Home'
    color='blue'
    icon={<FontAwesomeIcon icon={faHome} />}
    onClick={() => { props.history.push('/') }}></ButtonColored>
</div>

const BackButton = props => <div style={{ width: 120, margin: 5 }}>
  <ButtonColored
    title='Back'
    icon={<FontAwesomeIcon icon={faArrowLeft} />}
    onClick={() => {
      const path = props.location.pathname.split('/')
      path.pop()
      props.history.push(path.join('/'))
    }}></ButtonColored>
</div>