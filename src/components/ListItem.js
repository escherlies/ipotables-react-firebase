import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class ListItem extends Component {

  state = {}

  render() {

    return (
      <Div>
        <Link to={this.props.linkTo || ''} >
          <div style={{ padding: 8 }}>
            {this.props.title}
          </div>
        </Link>
      </Div>
    )
  }
}

export default ListItem


const Div = styled.div`

  border-style: solid;
  border-color: #BFD7EA;
  border-width: 1px 1px 0px 1px;
  background: #F6F6F6;

  &:first-of-type {
    border-radius: 8px 8px 0px 0px;
  }
  
  &:last-of-type {
    border-radius: 0px 0px 8px 8px;
    border: 1px solid #BFD7EA;
  }

  &:only-child {
    border-radius: 8px;
  }

  &:hover {
    cursor: pointer;
    background: #BFD7EA;
  }
`