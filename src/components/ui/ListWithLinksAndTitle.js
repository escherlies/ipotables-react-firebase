import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default function ListWithLinksAndTitle({ items, title, contentRenderer, linkConstructor }) {

  return <div style={{ borderRadius: 5, boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0)" }}>
    <Title>{title}</Title>
    <div>

    {
      _.map(items, (item, key) => (
        <ListItemDiv key={key}>
          <Link to={linkConstructor(item, key)}>
            <div>
              {contentRenderer(item, key)}
            </div>
          </Link>
        </ListItemDiv>
      ))
    }
    </div>
  </div>

}


// STYLED

const Title = styled.div`

  font-size: 1.2rem;
  /* background: #026699; */
  padding: 8px;
  /* border-radius: 5px 5px 0 0; */
  font-weight: 600;
  color: black;
`



const ListItemDiv = styled.div`

  background: #F9F8F8;
  padding-left: 12px;

  cursor: pointer;

  & > * > div {
    padding: 12px 5px;
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
    border-radius: 4px 4px 0px 0px;
  }
  
  &:last-of-type {
    border-radius: 0px 0px 4px 4px;

    & div {
      border-bottom: none;
    }
  }
  
  &:only-of-type {
    border-radius: 4px;
  }
`

