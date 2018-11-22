import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import LabeledTextInput from './ui/LabeledTextInput';
import ButtonColored from './ui/buttons/ButtonColored'


class AddThing extends Component {

  state = {}

  render() {

    return (
      <div>
        <LabeledTextInput label='Neu' field='input' context={this} />
        <Seperator height={5} />
        <ButtonColored title='Add Thing' color='yellow' icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => this.props.addThing(this.state.values.input)} />
      </div>
    )
  }
}

export default AddThing


const Seperator = styled.div`
  height: ${props => `${props.height}px` || 18}
`