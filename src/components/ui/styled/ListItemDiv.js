import styled from 'styled-components'


export default styled.div`

    border: 1px solid #00B2D2;
    border-width: 0px 1px 1px 1px;
    background: #F9F8F8;

    cursor: pointer;
    
    &:hover {
      background: #00B2D2;
    }
    
    &:first-of-type {
      border-width: 1px 1px 1px 1px;
      border-radius: 8px 8px 0px 0px;
    }

    &:last-of-type {
      border-radius: 0px 0px 8px 8px;
    }

`