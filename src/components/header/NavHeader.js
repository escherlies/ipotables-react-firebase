import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import styled from 'styled-components'

const NavHeader = props => (
  <div style={{ background: '#F1f1f1', }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: 80,
      padding: 15,
      maxWidth: 768,
      margin: 'auto',
    }}>
      <div style={{
        flex: 1,
      }}>
        <StyledLink><Link to="/">Home</Link></StyledLink>
        <StyledLink><Link to="/modules">Modules</Link></StyledLink>
        <StyledLink><Link to="/things">Things</Link></StyledLink>
      </div>
      <div style={{ flex: 1, }}>
        <img src={Logo} alt="ipo logo" style={{ height: 60, objectFit: 'contain', float: 'right' }} />
      </div >
    </div>
  </div>)


export default NavHeader


const StyledLink = styled.span`

  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  color: #EA526F;
  padding-right: 16px;

  &:hover {
    text-decoration: underline;
  }
`