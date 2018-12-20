import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default function ListWithLinksAndTitle({ items, title, contentRenderer, linkConstructor }) {

  return <div style={{ borderRadius: 5, boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.15)" }}>
    <Title>{title}</Title>
    {
      _.map(items, (item, key) => (
        <ListItemDiv key={key} onMouseOver={e => console.log(`e`, e)}>
          <Link to={linkConstructor(key)}>
            <div>
              {contentRenderer(item, key)}
            </div>
          </Link>
        </ListItemDiv>
      ))
    }
  </div>

}


// STYLED

const Title = styled.div`

  font-size: 1.2rem;
  background: #026699;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  font-weight: 600;
  color: #F8F7F7;
`



const ListItemDiv = styled.div`

  background: #F9F8F8;
  padding-left: 20px;

  cursor: pointer;

  & > * > div {
    padding: 20px 5px;
    border-bottom: 1px solid #D6D6D6;
  }
  
  &:hover {
    background: #F1F0F0;
    
    & .--display-on-hover {
      display: block;
    }
  }
  
  
  &:first-of-type {
    border-width: 1px 1px 1px 1px;
    border-radius: none;
  }
  
  &:last-of-type {
    border-radius: 0px 0px 8px 8px;

    & div {
      border-bottom: none;
    }
  }
  
  &:only-of-type {
    border-radius: 8px;
  }
`

