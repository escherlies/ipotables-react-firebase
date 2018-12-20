import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'

class ListItem extends Component {

  state = {}

  render() {

    return (
      <div>
        <Content style={{ padding: 0 }}>
          {this.props.title}
          {
            this.props.delete &&
            <div className="--display-on-hover" onClick={e => { e.preventDefault(); this.props.delete() }} style={{ paddingRight: 5 }} >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          }
        </Content>
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
      /* color: white; */
    }

    & div {
      display: none;
    }

    /* &:hover > div {
      display: block;
    } */
`