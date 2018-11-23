import React, { Component } from 'react'
import _ from 'lodash'
import Thing from './Thing';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faMagic, faInfoCircle, faCube, faPlus } from '@fortawesome/free-solid-svg-icons'
import LabeledTextInput from './ui/LabeledTextInput';
import AddThing from './AddThing';


class IpoModule extends Component {

  state = {
    title: '',
    description: '',
    inputs: {},
    process: '',
    outputs: {}
  }

  componentDidMount() {
    this.setState({
      title: 'Freshly Ground Coffee',
      description: 'How to get freshly ground coffee',
      inputs: {
        0: "Coffee Beans",
        1: "Coffee Grinder"
      },
      process: 'Put Coffeebeans in Grinder and Grind!',
      outputs: {
        3: "Ground Coffee",
        1: "Coffee Grinder"
      }
    })
  }

  renderThings = things => <div>{_.map(things, (thing, key) => <Thing key={key} title={thing} />)}</div>

  addThing = (value, target) => {
    const copy = _.cloneDeep(this.state[target])
    copy[_.size(copy)] = value
    this.setState({ [target]: copy })
  }

  render() {

    const { title, description, inputs, process, outputs } = this.state

    return (
      <div style={{ margin: 50, maxWidth: 900 }} >

        <Header><FontAwesomeIcon icon={faCube} /> Title:</Header>
        <Content>{title}</Content>
        <Seperator />

        <Header><FontAwesomeIcon icon={faInfoCircle} /> Description:</Header>
        <Content>{description}</Content>
        <Seperator />

        <FlexBox>
          <Column>
            <Header><FontAwesomeIcon icon={faSignInAlt} /> INPUTS</Header>
            {this.renderThings(inputs)}
            <AddThing addThing={(input) => this.addThing(input, 'inputs')} />

          </Column>

          <Column>
            <Header><FontAwesomeIcon icon={faMagic} /> PROCESS</Header>
            <Process>{process}</Process>
          </Column>

          <Column>
            <Header><FontAwesomeIcon icon={faSignOutAlt} /> OUTPUTS</Header>
            {this.renderThings(outputs)}
            <AddThing addThing={(input) => this.addThing(input, 'outputs')} />
          </Column>
        </FlexBox>
      </div>
    )
  }
}

export default IpoModule

const Seperator = styled.div`
  height: ${props => `${props.height}px` || 18}
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Content = styled.div`
    border-radius: 8px;
    border: 1px solid #BFD7EA;
    padding: 8px;
`

const Header = styled.div`
  padding: 8px;
  font-size: 1.2em;
  color: #EF476F;
`

const Process = styled.div`
  padding: 8px;
`

const Column = styled.div`
  margin-top: 12px;
  flex: 1;
  min-width: 200px;
`