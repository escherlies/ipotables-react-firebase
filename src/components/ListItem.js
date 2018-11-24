import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListItemDiv from './ui/styled/ListItemDiv';

class ListItem extends Component {

  state = {}

  render() {

    return (
      <ListItemDiv>
        <Link to={this.props.linkTo || ''} >
          <div style={{ padding: 8 }}>
            {this.props.title}
          </div>
        </Link>
      </ListItemDiv>
    )
  }
}

export default ListItem