import React, { Component } from 'react'
import { Route, Link as LinkRoute } from 'react-router-dom'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'


export default class Breadcrums extends Component {

  state = {}

  render() {

    const ArrowRight = () => <FontAwesomeIcon style={{ paddingLeft: 5, paddingRight: 5, color: '#696969' }} icon={faCaretRight} />
    const Link = props => <StyledLink><LinkRoute {...props} /></StyledLink>

    return (
      <div style={{ maxWidth: 768, margin: 'auto', padding: 8 }} >

        <Link to="/">IPO Tables</Link>
        <Route path='/:menu' render={({ match }) => <span><ArrowRight /><Link to={'/' + match.params.menu}>{_.upperFirst(match.params.menu)}</Link></span>} />
        <Route path='/:menu/:id' render={({ match }) => {

          const { menu, id } = match.params
          const item = _.get(this.props, `data.${menu}.${id}`)
          const title = item && (item.title || item.name)

          return <span><ArrowRight /><Link to={id}>{title}</Link></span>

        }} />
      </div>
    )
  }
}


const StyledLink = styled.span`

  cursor: pointer;
  color: #494949;

  &:hover {
    text-decoration: underline;
    color: #EF476F;
  }
`