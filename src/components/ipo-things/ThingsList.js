import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


class ThingsList extends Component {

  state = {}

  render() {
    const { things } = this.props

    return (
      <div style={{}} >
        <h2>Things</h2>
        {
          _.map(things, (thing, thingKey) => (
            <Div key={thingKey}>
              <Link to={`/things/${thingKey}`}>
                <div style={{ padding: 8 }}>
                  <Title>{thing.name}</Title>
                </div>
              </Link>
            </Div>
          ))
        }
      </div>
    )
  }
}

export default ThingsList


const Div = styled.div`

    border: 1px solid #BFD7EA;
    border-width: 0px 1px 1px 1px;
    background: #F6F6F6;

    cursor: pointer;
    
    &:hover {
      background: #BFD7EA;
    }
    
    &:first-of-type {
      border-width: 1px 1px 1px 1px;
      border-radius: 8px 8px 0px 0px;
    }

    &:last-of-type {
      border-radius: 0px 0px 8px 8px;
    }

`

const Title = styled.div`
    font-size: 1.2rem;
`