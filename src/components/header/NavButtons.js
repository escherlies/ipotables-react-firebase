import React from 'react';
import ButtonColored from '../ui/buttons/ButtonColored';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';


const HomeButton = props => <div style={{ width: 120, margin: 5 }}>
  <ButtonColored
    title='Home'
    color='blue'
    icon={<FontAwesomeIcon icon={faHome} />}
    onClick={() => { props.history.push('/') }}></ButtonColored>
</div>

const BackButton = props => <div style={{ width: 120, margin: 5 }}>
  <ButtonColored
    title='Back'
    color='yellow'
    icon={<FontAwesomeIcon icon={faArrowLeft} />}
    onClick={() => {
      const path = props.location.pathname.split('/')
      path.pop()
      props.history.push(path.join('/'))
    }}></ButtonColored>
</div>


export { HomeButton, BackButton }