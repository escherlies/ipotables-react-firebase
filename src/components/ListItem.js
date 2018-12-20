import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'

class ListItem extends Component {

  state = {}

  render() {

    return (
      <div>
        <Link to={this.props.linkTo || ''} >
          <Content style={{ padding: 12 }}>
            {this.props.title}
            {
              this.props.delete &&
              <div onClick={e => { e.preventDefault(); this.props.delete() }}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            }
          </Content>
        </Link>
      </div>
    )
  }
}

export default ListItem

const Content = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: white;
    }

    & div {
      display: none;
    }

    &:hover > div {
      display: block;
    }
`