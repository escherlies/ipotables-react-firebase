import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default function ListWithLinksAndTitle({ items, title, contentRenderer, linkConstructor }) {

  return <div>
    <Title>{title}</Title>
    {
      _.map(items, (item, key) => (
        <ListItemDiv key={key}>
          <Link to={linkConstructor(key)}>
            <div>
              {contentRenderer(item)}
            </div>
          </Link>
        </ListItemDiv>
      ))
    }
  </div>

}






/**
 * STYLES
 */


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

const Title = styled.div`

  font-size: 1.4rem;
  background: #026699;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  font-weight: 700;
  color: #F8F7F7;
`