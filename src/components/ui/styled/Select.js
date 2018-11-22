import styled, { css } from 'styled-components';

const Select = styled.select`
    font-size: 14px;
    height: 36px;
    color: #292929;
    background-color: #EBEBEB;
    border-radius: 8px;
    border: none;
    padding: 8px;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */    
    ${props => props.error && css`border: 1px solid red;`}
    &:focus {
      outline: none;
    background-color: #CBCBCB;
    }
`

export default Select