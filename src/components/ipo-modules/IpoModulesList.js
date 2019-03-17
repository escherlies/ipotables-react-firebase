import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle';
import StyledLink from '../ui/StyledLink'

class ThingsList extends Component {

  state = {}

  contentRenderer = module =>
    (<div>
      <div>{module.title}</div>
      <div style={{ fontSize: '0.8rem', paddingTop: 5 }}>{module.moduleDescription}</div>
    </div>)

  render() {
    const { modules } = this.props

    const linkConstructor = ( item, key ) => `/modules/${key}`

    return <ListWithLinksAndTitle
      items={modules}
      title={<div>
        <span style={{ paddingLeft: 8 }}>Modules</span>
        <span style={{ paddingRight: 8, float: 'right' }}>
          <StyledLink><Link to="/modules/add-new-module">+ Add Module</Link></StyledLink>
        </span>
      
      </div>}
      contentRenderer={this.contentRenderer}
      linkConstructor={linkConstructor}
    />
  }
}

export default ThingsList