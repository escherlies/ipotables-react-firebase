import React, { Component } from 'react'
import ListWithLinksAndTitle from '../ui/ListWithLinksAndTitle';

class ThingsList extends Component {

  state = {}

  render() {
    const { things } = this.props

    const contentRenderer = thing => <div>{thing.name}</div>
    const linkConstructor = key => `/things/${key}`

    return <ListWithLinksAndTitle
      items={things}
      title="Things"
      contentRenderer={contentRenderer}
      linkConstructor={linkConstructor}
    />
  }
}

export default ThingsList