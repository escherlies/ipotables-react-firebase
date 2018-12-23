import React, { Component } from 'react'
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCube } from '@fortawesome/free-solid-svg-icons';


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
      title={<div><FontAwesomeIcon icon={faCube} /><span style={{ paddingLeft: 8 }}>Modules</span></div>}
      contentRenderer={this.contentRenderer}
      linkConstructor={linkConstructor}
    />
  }
}

export default ThingsList