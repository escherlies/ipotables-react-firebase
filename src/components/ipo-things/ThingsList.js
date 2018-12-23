import React, { Component } from 'react'
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLemon } from '@fortawesome/free-solid-svg-icons';


class ThingsList extends Component {

  state = {}

  render() {
    const { things } = this.props

    const contentRenderer = thing => <div>{thing.name}</div>
    const linkConstructor = ( item, key ) => `/things/${key}`

    return <ListWithLinksAndTitle
      items={things}
      title={<div><FontAwesomeIcon icon={faLemon} /><span style={{ paddingLeft: 8 }}>Things</span></div>}
      contentRenderer={contentRenderer}
      linkConstructor={linkConstructor}
    />
  }
}

export default ThingsList

