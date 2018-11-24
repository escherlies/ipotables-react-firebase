import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ListItemDiv from '../ui/styled/ListItemDiv';


class ThingsList extends Component {

  state = {}

  render() {
    const { things } = this.props

    return (
      <div style={{}} >
        <h2>Things</h2>
        {
          _.map(things, (thing, thingKey) => (
            <ListItemDiv key={thingKey}>
              <Link to={`/things/${thingKey}`}>
                <div style={{ padding: 8 }}>
                  <Title>{thing.name}</Title>
                </div>
              </Link>
            </ListItemDiv>
          ))
        }
      </div>
    )
  }
}

export default ThingsList




const Title = styled.div`
    font-size: 1.2rem;
`