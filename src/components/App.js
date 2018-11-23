import React, { Component } from 'react';
import IpoModule from './IpoModule';
import base from '../functions/base';
import _ from 'lodash'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import IpoModulesList from './IpoModulesList';
import ButtonColored from './ui/buttons/ButtonColored';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
        <div className="App" style={{ padding: 8 }}>
          <div>IPO Tables!</div>

          <Route path='/:nav' component={BackButton} />


          <Route exact path='/' component={Home} />


          <Route exact path='/modules' render={() => <IpoModulesList modules={modules} readOnly={true} />} />

          <Switch>
            <Route exact path='/modules/add-new-module' render={() => <IpoModule things={things} />} />
            <Route exact path='/modules/:moduleKey/edit' render={({ match, history }) => <IpoModule moduleKey={match.params.moduleKey} things={things} module={_.get(modules, match.params.moduleKey)} />} />
            <Route exact path='/modules/:moduleKey' render={({ match, history }) => <IpoModule moduleKey={match.params.moduleKey} things={things} readOnly={true} module={_.get(modules, match.params.moduleKey)} navigateToModule={() => history.push(`/modules/${match.params.moduleKey}/edit`)} />} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;



const Home = props => (<div>
  <Link to='/modules'>
    <ButtonColored title={'Modules List'} />
  </Link>
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