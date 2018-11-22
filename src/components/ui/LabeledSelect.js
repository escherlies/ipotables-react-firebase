import React from 'react'
import _ from 'lodash'

import Label from './styled/Label'
import Select from './styled/Select'
import Error from './styled/Error'

const LabeledSelect = props => {

  const handleChange = (event) => {
    const values = { ...props.context.state.values }
    _.set(values, props.field, event.target.value)
    props.context.setState({ values })
  }

  const { field, type, options, disabled } = props
  const value = _.get(props.context.state, `values.${field}`)
  const error = _.get(props.context.state, `errors.${field}`)

  return <div style={styles.itemView}>
    <Label>{props.label}</Label>
    <Select
      value={value}
      onChange={handleChange}
      type={type}
      error={error}
      disabled={disabled}
    >
      <option key="none" value="none">Keine</option>
      {_.map(options, (value, key) => <option key={key} value={key}>{value.title}</option>)}
    </Select>
    {error && <Error>{error}</Error>}
  </div>
}

export default LabeledSelect


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
