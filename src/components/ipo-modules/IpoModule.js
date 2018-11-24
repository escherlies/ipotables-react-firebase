import React, { Component } from 'react'
import _ from 'lodash'
import ListItem from '../ListItem';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faMagic, faInfoCircle, faCube } from '@fortawesome/free-solid-svg-icons'
import AddThing from './AddThing';
import faker from 'faker'
import ButtonColored from '../ui/buttons/ButtonColored';
import firebaseApp from '../../functions/firebaseApp';


class IpoModule extends Component {

  state = {
    title: '',
    moduleDescription: '',
    inputs: {},
    outputs: {},
    processDescription: ''
  }

  componentDidMount() {
    this.props.module && this.setState({ ...this.props.module })
  }

  componentWillReceiveProps(nextProps) {
    nextProps.module && this.setState({ ...nextProps.module })

    if (false && process.env.NODE_ENV === 'development' && !this.props.module) this.setState({
      title: faker.lorem.words(_.random(1, 5)),
      moduleDescription: `How to ${faker.lorem.sentence(3)}`,
      processDescription: faker.lorem.paragraphs(2),
      inputs: { [_.sample(_.keys(nextProps.things))]: true },
      outputs: { [_.sample(_.keys(nextProps.things))]: true }
    })
  }

  renderThingsOfModule = things => <div>{_.map(things, (thing, key) => <ListItem key={key} title={_.get(this.props.things, `${key}.name`)} linkTo={`/things/${key}`} />)}</div>

  addThingTo = (target) => (key) => {
    const copy = _.cloneDeep(this.state[target])
    copy[key] = true
    this.setState({ [target]: copy })
  }

  handleTextInputChange = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  createModule = () => {

    const updates = {}

    // module
    const moduleKey = this.props.moduleKey || firebaseApp.database().ref().push().key
    updates[`modules/${moduleKey}`] = this.state // state represents modules object structure

    // add module reference to things
    const targetPath = {
      inputs: 'inputOf',
      outputs: 'outputOf',
    }
    const addReference = (targetPath, target) => _.forEach(_.get(this.state, target), (value, key) => _.set(updates, `things/${key}/${targetPath}/${moduleKey}`, true))
    _.forEach(targetPath, addReference)

    firebaseApp.database().ref().update(updates)
      .then(window.confirm('Done!') && this.props.goBack())
      .catch(e => window.alert(e))
  }

  render() {

    const { title, moduleDescription, inputs, processDescription, outputs } = this.state
    const { things, readOnly } = this.props

    const options = _.map(things, (thing, key) => ({ key, ...thing }))

    return (
      <div>

        <Header><FontAwesomeIcon icon={faCube} /> Title:</Header>
        <Input name="title" value={title} onChange={this.handleTextInputChange} disabled={readOnly} />
        <Seperator />

        <Header><FontAwesomeIcon icon={faInfoCircle} /> Description:</Header>
        <Input name="moduleDescription" value={moduleDescription} onChange={this.handleTextInputChange} disabled={readOnly} />
        <Seperator />

        <FlexBox>
          <Column>
            <Header><FontAwesomeIcon icon={faSignInAlt} /> INPUTS</Header>
            {this.renderThingsOfModule(inputs)}

            {
              !readOnly &&
              <AddThing addThing={this.addThingTo('inputs')} options={options} />
            }

          </Column>

          <Column>
            <Header><FontAwesomeIcon icon={faMagic} /> PROCESS</Header>
            <Process
              id="processDescription"
              name="processDescription"
              value={processDescription}
              disabled={readOnly}
              onChange={this.handleTextInputChange} />
          </Column>

          <Column>
            <Header><FontAwesomeIcon icon={faSignOutAlt} /> OUTPUTS</Header>
            {this.renderThingsOfModule(outputs)}
            {
              !readOnly &&
              <AddThing addThing={this.addThingTo('outputs')} options={options} />
            }
          </Column>
        </FlexBox>
        <Seperator />
        <Seperator />
        <div style={{ marginTop: 30 }}>
          {
            readOnly ?
              <ButtonColored icon={<FontAwesomeIcon icon={faCube} />} title='Edit Module' color='default' onClick={this.props.navigateToModule}></ButtonColored> :
              <ButtonColored icon={<FontAwesomeIcon icon={faCube} />} title='Create Module' color='default' onClick={this.createModule}></ButtonColored>

          }
        </div>
      </div>
    )
  }
}

export default IpoModule

const Seperator = styled.div`
  height: ${props => `${props.height}px` || 18};
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`

const Input = styled.input`
    all: unset;
    border-radius: 8px;
    border: 1px solid #00B2D2;
    padding: 8px;
    width: calc(100% - 2*8px);
    &:disabled {
      background: #F6F6F6;
    }
`

const Header = styled.div`
  padding: 8px;
  font-size: 1.2em;
  color: #EA526F;
`

const Process = styled.textarea`
  /* all: unset; */
  font-size: unset;
  font-family: unset;
  color: unset;
  resize: vertical;
  margin-left: 8px;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #00B2D2;
  border-radius: 8px;
  width: calc(100% - 4*8px);
  height: 150px;

  &:disabled {
    background: #F6F6F6;
  }
`

const Column = styled.div`
  margin-top: 12px;
  flex: 1;
`