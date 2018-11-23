import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import LabeledTextInput from './ui/LabeledTextInput';
import ButtonColored from './ui/buttons/ButtonColored'
import Select from 'react-select'
import Creatable from 'react-select/lib/Creatable';
import _ from 'lodash'
import slugify from 'slugify';
import firebaseApp from '../functions/firebaseApp'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const options = [
  { key: 'key-1', name: 'Chocolate' },
  { key: 'key-2', name: 'Strawberry' },
  { key: 'key-3', name: 'Vanilla' },
]


class AddThing extends Component {

  state = {
    selectedOption: ''
  }

  getOptionValueAndLabel = option => ({ value: option.key, label: option.name })

  getNewOptionData = (value, label) => {
    const key = firebaseApp.database().ref().push().key
    return { key, name: label, isNewOption: true }
  }

  isValidNewOption = (inputValue, selectValue, selectOptions) => {

    // helper functions
    const slug = str => slugify(str, { lower: true })

    const compareOption = (inputValue, option) => {

      const candidate = slug(inputValue);

      return (
        slug(this.getOptionValueAndLabel(option).value) === candidate ||
        slug(this.getOptionValueAndLabel(option).label) === candidate
      );
    }

    // comparisons
    return !(!inputValue ||
      selectValue.some(option => compareOption(inputValue, option)) ||
      selectOptions.some(option => compareOption(inputValue, option)));

  }

  handleSubmit = () => {
    const { key, name, isNewOption } = this.state.selectedOption

    // update firebase
    if (isNewOption) firebaseApp.database().ref(`/things/${key}/name`).set(name)

    // send selected data to parent component
    this.props.addThing(key)
  }


  render() {
    console.log(`this.state.value`, this.state.selectedOption)

    return (
      <div>
        <Creatable
          options={options}
          getOptionLabel={option => this.getOptionValueAndLabel(option).label}
          getOptionValue={option => this.getOptionValueAndLabel(option).value}
          getNewOptionData={this.getNewOptionData}
          isValidNewOption={this.isValidNewOption}
          isClearable
          onChange={(selectedOption, action) => this.setState({ selectedOption })}
        />
        <Seperator height={5} />
        <ButtonColored title='Add Thing' color='yellow' icon={<FontAwesomeIcon icon={faPlus} />} onClick={this.handleSubmit} />
      </div>
    )
  }
}

export default AddThing


const Seperator = styled.div`
  height: ${props => `${props.height}px` || 18}
        `