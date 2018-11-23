import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ButtonColored from '../ui/buttons/ButtonColored'
import Creatable from 'react-select/lib/Creatable';
import slugify from 'slugify';
import firebaseApp from '../../functions/firebaseApp'
import PropTypes from 'prop-types'


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
    
    if (!this.state.selectedOption) return null

    const { key, name, isNewOption } = this.state.selectedOption

    // update firebase
    if (isNewOption) firebaseApp.database().ref(`/things/${key}/name`).set(name)

    // send selected data to parent component
    this.props.addThing(key)

    this.setState({ selectedOption: null })
  }


  render() {
    console.log(`this.state.value`, this.state.selectedOption)

    const { options } = this.props

    return (
      <Container>
        <Seperator height={5} />
        <div>Add new thing to the list:</div>
        <Seperator height={5} />
        <Creatable
          options={options}
          getOptionLabel={option => this.getOptionValueAndLabel(option).label}
          getOptionValue={option => this.getOptionValueAndLabel(option).value}
          getNewOptionData={this.getNewOptionData}
          isValidNewOption={this.isValidNewOption}
          isClearable
          value={this.state.selectedOption}
          onChange={(selectedOption, action) => this.setState({ selectedOption })}
        />
        <Seperator height={5} />
        <ButtonColored title='Add Thing' color='yellow' icon={<FontAwesomeIcon icon={faPlus} />} onClick={this.handleSubmit} />
      </Container>
    )
  }
}

export default AddThing


AddThing.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  )
}


const Seperator = styled.div`
  height: ${props => `${props.height}px` || 18};
`

const Container = styled.div`
  background: #F6F6F6;
  border-radius: 8px;
  padding: 8px;
  margin-top: 15px;
`