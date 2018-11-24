import React from 'react';
import { ButtonRaw } from './ButtonRaw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'


const ButtonColored = props => {

  const colorsSets = {
    default: ['#E3E3E3', '#D0D0D0', '#292929'],
    active: ['#4D5B7D', '#3A445D', '#FFFFFF'],
    green: ['#E0FF4F', '#B8D141', '#292929'],
    blue: ['#026699', '#02547E', '#F6F6F6'],
    yellow: ['#FED766', '#E7C45D', '#292929'],
    red: ['#FE4A49', '#CD3433', '#FFF'],
    grey: ['#D0D0D0', '#B5B5B5', '#FFF'],
    silver: ['#F9F9F9', '#EBEBEB', '#545454'],
  }


  const colors = colorsSets[props.color] || colorsSets['default']

  return (
    <ButtonRaw position={props.position} onClick={props.onClick} backgroundColor={colors[0]} edgeColor={colors[1]} >
      <div style={{
        fontSize: 20, fontWeight: 'bold', color: colors[2], display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {typeof props.icon === 'string' && <FontAwesomeIcon icon={props.icon} />}
        {typeof props.icon === 'object' && props.icon}
        {
          props.title &&
          <span style={{ paddingLeft: props.icon ? 12 : 0, }}>{props.title}</span>
        }
      </div>
    </ButtonRaw>
  )


}


ButtonColored.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onClick: PropTypes.func
}



export default ButtonColored