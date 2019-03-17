import React, { Component } from 'react'
import styled from 'styled-components'
import Creatable from 'react-select/lib/Creatable';
import slugify from 'slugify';
import firebaseApp from '../../functions/firebaseApp'
import PropTypes from 'prop-types'

class AddThing extends Component {

  state = {
    selectedOption: '',
    inputValue: '',
    submitOnEnter: false,
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

  handleSubmit = async (selectedOption) => {

    console.log(selectedOption)
    if (!selectedOption) return null

    const { key, name, isNewOption } = selectedOption

    // update firebase
    if (isNewOption) await firebaseApp.database().ref(`/things/${key}/name`).set(name)

    // send selected data to parent component
    this.props.addThing(key)

    this.setState({ selectedOption: null, submitOnEnter: false })
  }


  render() {

    const { options } = this.props

    return (
      <Container onKeyDownCapture={event => {
        const key = event.key
        this.setState((state) => ({ ...state, submitOnEnter: key === 'Enter' }))
      }}>
        <Creatable
          placeholder={'Add thing…'}
          options={options}
          getOptionLabel={option => this.getOptionValueAndLabel(option).label}
          getOptionValue={option => this.getOptionValueAndLabel(option).value}
          getNewOptionData={this.getNewOptionData}
          isValidNewOption={this.isValidNewOption}
          isClearable
          value={this.state.selectedOption}
          onChange={(selectedOption, action) => this.handleSubmit(selectedOption)}
          onKeyDown={event => console.log(event.key)}
          onInputChange={inputValue => this.setState((state) => ({ ...state, inputValue }))}
          menuIsOpen={this.state.inputValue.length > 0}
        />
        {/* <Seperator height={5} /> */}
        {/* <ButtonColored title='Add' color='yellow' icon={<FontAwesomeIcon icon={faPlus} />} onClick={this.handleSubmit} /> */}
      </Container>
    )
  }
}


AddThing.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  )
}


export default AddThing


const Container = styled.div`
  background: #F6F6F6;
  /* border-radius: 4px; */
  /* padding: 8px; */
  /* margin-top: 8px; */
`