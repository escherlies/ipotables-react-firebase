import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import StyledLink from '../ui/StyledLink'


const NavHeader = props => (
  <div style={{ background: '#F1f1f1', }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 80,
      padding: 15,
      maxWidth: 768,
      margin: 'auto',
    }}>
      <div style={{
        flex: "auto",
        display: "flex",
        flexWrap: 'wrap'
      }}>
        <StyledLink><Link to="/">Home</Link></StyledLink>
        <StyledLink><Link to="/modules">Modules</Link></StyledLink>
        <StyledLink><Link to="/things">Things</Link></StyledLink>
        <StyledLink><Link to="http://ipo.opencircularity.info/">Documentation</Link></StyledLink>
      </div>
      <div>
        <img src={Logo} alt="ipo logo" style={{ height: 60, objectFit: 'contain', float: 'right' }} />
      </div >
    </div>
  </div>)


export default NavHeader
