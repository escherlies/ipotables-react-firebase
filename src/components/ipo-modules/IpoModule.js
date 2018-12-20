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
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle';


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

  renderThingsOfModule = target => (___, key) => {

    const thing = _.get(this.props, `things.${key}`)
    console.log(`thing`, thing)
    console.log(`key`, key)

    return (<ListItem
      key={key}
      title={thing.name}
      delete={!this.props.readOnly && (() => this.removeThingFromModuleFromTarget({ target, key }))}
      linkTo={`/things/${key}`} />)
  }

  removeThingFromModuleFromTarget = ({ target, key }) => {
    console.log('----logging point---- ')
    const copy = _.cloneDeep(this.state[target])
    delete copy[key]
    this.setState({ [target]: copy })
  }

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

        <TitledInputWrapper>
          <ModuleTitle>
            <FontAwesomeIcon icon={faCube} /><TitleInput name="title" value={title} onChange={this.handleTextInputChange} disabled={readOnly} />
          </ModuleTitle>
          <Input name="moduleDescription" value={moduleDescription} onChange={this.handleTextInputChange} disabled={readOnly} />
        </TitledInputWrapper>

        <FlexBox>
          <Column>
            <ListWithLinksAndTitle
              items={inputs}
              title={<div><FontAwesomeIcon icon={faSignInAlt} /><span style={{ paddingLeft: 8 }}>INPUTS</span></div>}
              contentRenderer={this.renderThingsOfModule('inputs')}
              linkConstructor={key => `/things/${key}`}
            />

            {
              !readOnly &&
              <AddThing addThing={this.addThingTo('inputs')} options={options} />
            }

          </Column>

          <Column>
            <TitledInputWrapper>
              <Title><FontAwesomeIcon icon={faMagic} /> PROCESS</Title>
              <Process
                id="processDescription"
                name="processDescription"
                value={processDescription}
                disabled={readOnly}
                onChange={this.handleTextInputChange} />
            </TitledInputWrapper>
          </Column>

          <Column>
            <ListWithLinksAndTitle
              items={outputs}
              title={<div><FontAwesomeIcon icon={faSignOutAlt} /><span style={{ paddingLeft: 8 }}>OUTPUTS</span></div>}
              contentRenderer={this.renderThingsOfModule('outputs')}
              linkConstructor={key => `/things/${key}`}
            />
            {
              !readOnly &&
              <AddThing addThing={this.addThingTo('outputs')} options={options} />
            }
          </Column>
        </FlexBox>

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

const TitleInput = styled.input`
    all: unset;
    background: transparent;
    width: 100%;
    margin-left: 8px;
`

const Input = styled.input`
    all: unset;
    background: #F6F6F6;
    border-radius: 0 0 8px 8px;
    padding: 15px;
    /* border: 1px solid #d6d6d6; */
    width: calc(100% - 2*15px);
    &:disabled {
      border-bottom: 1px solid #d6d6d6;
    }
`

const ModuleTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  background: #026699;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  font-weight: 600;
  color: #F8F7F7;
`

const Title = styled.div`

  font-size: 1.2rem;
  background: #026699;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  font-weight: 600;
  color: #F8F7F7;
`


const Process = styled.textarea`
  /* all: unset; */
  font-size: unset;
  border: unset;
  resize: vertical;
  border-radius: 0 0 8px 8px;
  padding: 15px;
  width: calc(100% - 2*15px);
  height: 155px;
  background: #F9F8F8;
  margin-bottom: -3px;
  user-select: auto;

  &:disabled {
    background: #F9F8F8;
  }
`

const Column = styled.div`
  margin: 12px 12px;
  flex: 1;
`

const TitledInputWrapper = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`