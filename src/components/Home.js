import React from 'react';
import LabeledTextInput from './ui/LabeledTextInput'
import { faCube, faLemon, faCheck, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ButtonColored from './ui/buttons/ButtonColored';
import _ from 'lodash'
import ListItem from './ListItem';
import ListWithLinksAndTitle from './ui/ListWithLinksAndTitle';


const Home = props => {

  const inputValue = _.get(props, 'context.state.values.get-started-input')
  const modulesMap = _.map(props.modules, (module, key) => ({ key, ...module }))
  const selectedModules = inputValue && _.filter(modulesMap, (module, key) => module.title.toLowerCase().includes(inputValue.toLowerCase()))


  return (<div styles={{ maxWidth: 400, }}>
    <h3>Get started</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    }}>
      <LabeledTextInput label='What do you want to document?' field='get-started-input' context={props.context} />
      <div style={{ width: 75 }}>
        <ButtonColored icon={<FontAwesomeIcon icon={faCheck} />} color='blue' onClick={() => props.createNewModule(inputValue)} />
      </div>
    </div>
    <div style={{ marginTop: 15 }}>
      {!_.isEmpty(selectedModules) &&
        <ListWithLinksAndTitle
          items={selectedModules}
          title={<div><FontAwesomeIcon icon={faHandPointRight} /><span style={{ paddingLeft: 8 }}>Found these modules in the database:</span></div>}
          contentRenderer={(module) => <ListItem key={module.key} title={module.title} linkTo={`modules/${module.key}`} />}
          linkConstructor={(item, key) => `/modules/${item.key}`}
        />
      }
    </div>

    <h3>View all existing</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <Link to='/modules' style={{ flex: 1, margin: 5 }}>
        <ButtonColored title={'Modules'} color='blue' icon={<FontAwesomeIcon icon={faCube} />} />
      </Link>
      <Link to='/things' style={{ flex: 1, margin: 5 }}>
        <ButtonColored title={'Things'} color='blue' icon={<FontAwesomeIcon icon={faLemon} />} />
      </Link>
    </div>
  </div>)
}

export default Home