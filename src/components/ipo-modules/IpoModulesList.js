import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ListItemDiv from '../ui/styled/ListItemDiv';


class IpoModulesList extends Component {

  state = {}

  render() {
    const { modules } = this.props

    return (
      <div style={{}} >
        <h2>Modules</h2>
        {
          _.map(modules, (module, moduleKey) => (
            <ListItemDiv key={moduleKey}>
              <Link to={`/modules/${moduleKey}`}>
                <div style={{ padding: 8 }}>
                  <Title>{module.title}</Title>
                  <Description>{module.moduleDescription}</Description>
                </div>
              </Link>
            </ListItemDiv>
          ))
        }
      </div>
    )
  }
}

export default IpoModulesList

const Title = styled.div`
    font-size: 1.2rem;
`

const Description = styled.div`
    font-size: 0.9rem;
`