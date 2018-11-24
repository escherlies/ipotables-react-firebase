import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


class IpoModulesList extends Component {

  state = {}

  render() {
    const { modules } = this.props

    return (
      <div style={{}} >
        <h2>Modules</h2>
        {
          _.map(modules, (module, moduleKey) => (
            <Div key={moduleKey}>
              <Link to={`/modules/${moduleKey}`}>
                <div style={{ padding: 8 }}>
                  <Title>{module.title}</Title>
                  <Description>{module.moduleDescription}</Description>
                </div>
              </Link>
            </Div>
          ))
        }
      </div>
    )
  }
}

export default IpoModulesList


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

const Description = styled.div`
    font-size: 0.9rem;
`