import React from 'react';
import LabeledTextInput from './ui/LabeledTextInput'
import { faCube, faLemon, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ButtonColored from './ui/buttons/ButtonColored';
import _ from 'lodash'
import ListItem from './ListItem';


const Home = props => {

  const inputValue = _.get(props, 'context.state.values.get-started-input')
  const modulesMap = _.map(props.modules, (module, key) => ({ key, ...module }))
  const selectedModules = inputValue && _.filter(modulesMap, (module, key) => module.title.toLowerCase().includes(inputValue.toLowerCase()))

  console.log(`selectedModules`, selectedModules)


  return (<div styles={{ maxWidth: 400, }}>
    <h3>Get started</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    }}>
      <LabeledTextInput label='What do you want to document?' field='get-started-input' context={props.context} />
      <div style={{ width: 75 }}>
        <ButtonColored icon={<FontAwesomeIcon icon={faCheck} />} color='green' onClick={() => props.createNewModule(inputValue)} />
      </div>
    </div>
    <div style={{ marginTop: 15 }}>
      {!_.isEmpty(selectedModules) && <span>{'👀'} Found these modules in the database:</span>}
      {_.map(selectedModules, (module) => <ListItem key={module.key} title={module.title} linkTo={`modules/${module.key}`} />)}
    </div>

    <h3>View all existing</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <Link to='/modules' style={{ flex: 1, margin: 5 }}>
        <ButtonColored title={'Modules'} icon={<FontAwesomeIcon icon={faCube} />} />
      </Link>
      <Link to='/things' style={{ flex: 1, margin: 5 }}>
        <ButtonColored title={'Things'} icon={<FontAwesomeIcon icon={faLemon} />} />
      </Link>
    </div>
  </div>)
}

export default Home