import React from 'react'
import { ImSpinner8 } from 'react-icons/im'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    color: palevioletred;
    font-size: 2rem;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%)
`;

const Loader = () => <Spinner><ImSpinner8/></Spinner>

export default Loader
