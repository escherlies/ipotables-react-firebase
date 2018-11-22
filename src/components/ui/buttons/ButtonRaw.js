import React from 'react';
import styled, { css } from 'styled-components';



const getBorder = (position) => {


  const border = {
    top: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    bottom: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    middle: {},
    default: {
      borderRadius: 8
    }
  }


  return position ? border[position] : border.default
}


export const ButtonRaw = props => {

  const position = props.position


  const border = getBorder(position)
  let edge = {}
  if (position !== 'top' && position !== 'middle') edge = {
    ...styles.Shadow, backgroundColor: props.edgeColor, paddingBottom: 3
  }


  return (
    <Hover isActive={props.isActive} >
      <div style={{ width: '100%', height: 36, }} onClick={props.onClick} >
        <div style={{ height: '100%', ...border, ...edge }}>
          <div style={{ height: '100%', ...border, backgroundColor: props.backgroundColor }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 20 }}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </Hover>
  )
}


const Hover = styled.div`
  ${props => css`
    &:hover { 
      opacity: ${props.isActive ? 1 : 0.7};
      cursor: pointer;
      }
`}
`



const styles = {
  Shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
}
