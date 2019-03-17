import React, { Component } from 'react';
import LabeledTextInput from './ui/LabeledTextInput'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ButtonColored from './ui/buttons/ButtonColored';
import _ from 'lodash'
import ListItem from './ListItem';
import ListWithLinksAndTitle from './ui/ListWithLinksAndTitle';


export default class Home extends Component {

  state = {
    values: {}
  }

  render() {


    const inputValue = _.get(this.state, 'values.get-started-input')
    const modulesMap = _.map(this.props.modules, (module, key) => ({ key, ...module }))
    const selectedModules = inputValue && _.filter(modulesMap, (module, key) => module.title.toLowerCase().includes(inputValue.toLowerCase()))

    return (<div styles={{ maxWidth: 400, }}>
      <h3>What do you want to document?</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
        <LabeledTextInput field='get-started-input' context={this} placeholder={'Start typing…'} />
        <div style={{ width: 75 }}>
          <ButtonColored icon={<FontAwesomeIcon icon={faCheck} />} color='blue' onClick={() => this.props.createNewModule(inputValue)} />
        </div>
      </div>
      <div style={{ marginTop: 15 }}>
        {!_.isEmpty(selectedModules) &&
          <ListWithLinksAndTitle
            items={selectedModules}
            title={<div><FontAwesomeIcon /><span style={{ paddingLeft: 8 }}>Found these modules in the database:</span></div>}
            contentRenderer={(module) => <ListItem key={module.key} title={module.title} linkTo={`modules/${module.key}`} />}
            linkConstructor={(item, key) => `/modules/${item.key}`}
          />
        }
      </div>

      <h3>View existing</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Link to='/modules' style={{ flex: 1, margin: 5 }}>
          <ButtonColored title={'Modules'} color='blue'  />
        </Link>
        <Link to='/things' style={{ flex: 1, margin: 5 }}>
          <ButtonColored title={'Things'} color='blue'  />
        </Link>
      </div>
    </div >)
  }
}
