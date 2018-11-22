import React, { Component } from 'react'
import styled from 'styled-components'

class Thing extends Component {

  state = {}

  render() {

    return (
      <Div>
        {this.props.title}
      </Div>
    )
  }
}

export default Thing


const Div = styled.div`

  padding: 8px;
  border-style: solid;
  border-color: #BFD7EA;
  border-width: 1px 1px 0px 1px;

  &:first-of-type {
    border-radius: 8px 8px 0px 0px;
  }
  
  &:last-of-type {
    border-radius: 0px 0px 8px 8px;
    border: 1px solid #BFD7EA;
  }

  &:hover {
    cursor: pointer;
    background: #BFD7EA;
  }
`