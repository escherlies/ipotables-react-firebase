import React, { Component } from 'react'
import _ from 'lodash'
import ListItem from '../ListItem';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Thing extends Component {

  state = {}

  renderNodes = (nodes, modules) => _.map(nodes, (module, key) => <ListItem title={_.get(modules, `${key}.title`)} linkTo={`/modules/${key}`} />)

  render() {

    const { thing, modules } = this.props

    if (!thing) return null

    return (
      <div>
        <h2>{thing.name}</h2>
        <FlexBox >
          <Column>
            <Header><FontAwesomeIcon icon={faSignInAlt} /> Ingredient to</Header>
            <div>
              {
                this.renderNodes(thing.inputOf, modules)
              }
            </div>
          </Column>
          <Column>
            <Header><FontAwesomeIcon icon={faSignOutAlt} /> Result of</Header>
            <div>
              {
                this.renderNodes(thing.outputOf, modules)
              }
            </div>
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
`