import React, { Component } from 'react'
import _ from 'lodash'
import ListItem from '../ListItem';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faLemon } from '@fortawesome/free-solid-svg-icons'
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle'


class Thing extends Component {

  state = {}

  renderNodes = (modules) => (node, key) => <ListItem title={_.get(modules, `${key}.title`)} />


  render() {

    const { thing, modules } = this.props

    if (!thing) return null

    return (
      <div>
        <TitledInputWrapper>
          <ModuleTitle><FontAwesomeIcon icon={faLemon} /><span style={{ paddingLeft: 8 }}>Thing: {thing.name}</span></ModuleTitle>
        </TitledInputWrapper>
        <FlexBox >
          <Column>
            <ListWithLinksAndTitle
              items={thing.inputOf}
              title={<div><FontAwesomeIcon icon={faSignInAlt} /><span style={{ paddingLeft: 8 }}>Ingredient to</span></div>}
              contentRenderer={this.renderNodes(modules)}
              linkConstructor={(item, key) => `/modules/${key}`}
            />
          </Column>
          <Column>
            <ListWithLinksAndTitle
              items={thing.outputOf}
              title={<div><FontAwesomeIcon icon={faSignOutAlt} /><span style={{ paddingLeft: 8 }}>Output of</span></div>}
              contentRenderer={this.renderNodes(modules)}
              linkConstructor={(item, key) => `/modules/${key}`}
            />
          </Column>
        </FlexBox>
      </div>
    )
  }
}

export default Thing


const Header = styled.div`
  padding: 8px;
  font-size: 1.2em;
  color: #EF476F;
`
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`


const Column = styled.div`
  margin-top: 12px;
  flex: 1;
  min-width: 200px;
  padding: 5px;
`


const ModuleTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  background: #026699;
  padding: 15px;
  border-radius: 5px;
  font-weight: 600;
  color: #F8F7F7;
`

export const TitledInputWrapper = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`