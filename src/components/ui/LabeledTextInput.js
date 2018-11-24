import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

import Label from './styled/Label'
import Input from './styled/Input'
import Error from './styled/Error'


const LabeledTextInput = props => {

  const handleChange = (event) => {
    const values = { ...props.context.state.values }
    _.set(values, props.field, event.target.value)
    props.context.setState({ values })
  }

  const { field, type, disabled } = props
  const value = _.get(props.context.state, `values.${field}`)
  const error = _.get(props.context.state, `errors.${field}`)

  return <div style={styles.itemView}>
    <Label>{props.label}</Label>
    <div style={{ background: '#B8D141', paddingBottom: 3, borderRadius: 8 }}>
      <Input
        value={value}
        onChange={handleChange}
        type={type}
        error={error}
        disabled={disabled}
      />    {
        error && <Error>{error}</Error>
      }
    </div>
  </div>
}

export default LabeledTextInput

LabeledTextInput.propTypes = {
  field: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}



const styles = {
  itemView: {
    width: '100%',
    marginTop: 8,
    marginRight: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
    // height: 30,
    // backgroundColor: 'yellow',
    // justifyContent: 'flex-end',
  },
}
