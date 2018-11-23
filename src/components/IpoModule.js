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
    slug: '',
    moduleDescription: '',
    inputs: {},
    outputs: {},
    processDescription: "awdawd\n\n\nadwadwdaw"
  }

  componentDidMount() {
    this.setState({
      title: 'Freshly Ground Coffee',
      moduleDescription: 'How to get freshly ground coffee',
      inputs: {},
      processDescription: 'Put Coffeebeans in Grinder and Grind!',
      outputs: {}
    })
  }

  renderThings = things => <div>{_.map(things, (thing, key) => <Thing key={key} title={thing} />)}</div>

  addThing = (value, target) => {
    const copy = _.cloneDeep(this.state[target])
    copy[_.size(copy)] = value
    this.setState({ [target]: copy })
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  render() {

    const { title, moduleDescription, inputs, processDescription, outputs } = this.state

    return (
      <div style={{ margin: 50, maxWidth: 900 }} >

        <Header><FontAwesomeIcon icon={faCube} /> Title:</Header>
        <Input name="title" value={title} onChange={this.handleInputChange} />
        <Seperator />

        <Header><FontAwesomeIcon icon={faInfoCircle} /> Description:</Header>
        <Input name="moduleDescription" value={moduleDescription} onChange={this.handleInputChange} />
        <Seperator />

        <FlexBox>
          <Column>
            <Header><FontAwesomeIcon icon={faSignInAlt} /> INPUTS</Header>
            {this.renderThings(inputs)}

            <AddThing addThing={(input) => this.addThing(input, 'inputs')} />

          </Column>

          <Column>
            <Header><FontAwesomeIcon icon={faMagic} /> PROCESS</Header>
            <Process
              id="processDescription"
              name="processDescription"
              value={processDescription}
              readOnly={false}
              onChange={this.handleInputChange} />
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

const Input = styled.input`
    all: unset;
    border-radius: 8px;
    border: 1px solid #BFD7EA;
    padding: 8px;
    width: calc(100% - 2*8px);
`

const Header = styled.div`
  padding: 8px;
  font-size: 1.2em;
  color: #EF476F;
`

const Process = styled.textarea`
  all: unset;
  resize: vertical;
  margin: 8px;
  padding: 8px;
  border: 1px solid #BFD7EA;
  border-radius: 8px;
  width: calc(100% - 4*8px);
  height: 150px;
`

const Column = styled.div`
  margin-top: 12px;
  flex: 1;
  min-width: 200px;
`