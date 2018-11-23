import React, { Component } from 'react';
import IpoModule from './IpoModule';
import base from '../functions/base';
import _ from 'lodash'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import IpoModulesList from './IpoModulesList';
import ButtonColored from './ui/buttons/ButtonColored';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCube, faBox, faPuzzlePiece, faLemon } from '@fortawesome/free-solid-svg-icons';
import ThingsList from './ThingsList';

class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    base.bindToState('/', { context: this, state: 'data' })
  }

  render() {
    console.log(`this.state`, this.state)

    const things = _.cloneDeep(this.state.data.things)
    const modules = _.cloneDeep(this.state.data.modules)

    return (
      <BrowserRouter>
        <div className="App" style={{ padding: 8, maxWidth: 800 }}>

          <Route path='/:nav' component={BackButton} />

          <h1>IPO Tables!</h1>

          <Route exact path='/' component={Home} />


          <Route exact path='/modules' render={() => <IpoModulesList modules={modules} readOnly={true} />} />
          <Route exact path='/things' render={() => <ThingsList things={things} readOnly={true} />} />

          <Switch>
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



const Home = props => (<div>

  <div>View:</div>
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 300
  }}>
    <Link to='/modules' style={{ flex: 1, margin: 5 }}>
      <ButtonColored title={'Modules'} icon={<FontAwesomeIcon icon={faCube} />} />
    </Link>
    <Link to='/things' style={{ flex: 1, margin: 5 }}>
      <ButtonColored title={'Things'} icon={<FontAwesomeIcon icon={faLemon} />} />
    </Link>
  </div>
</div>)


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