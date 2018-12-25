import styled, { css } from 'styled-components';

const sharedStyle = css`
  position: relative;
  background: none;
  border: 2px solid ${props => props.theme.black};
  padding: ${props => props.theme.spacingSmall}
    ${props => props.theme.spacingBase};
  font-size: 1rem;
  font-weight: bold;
  font-family: ${props => props.theme.fontHeading};
  text-align: center;
  line-height: 1.2;
  color: ${props => props.theme.black};

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    right: 100%;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.primary};
    z-index: -1;
    transition: all 0.1s ease-in;
  }

  &:hover,
  &:focus {
    &::after {
      right: 0;
    }
  }
`;

const Button = styled.button`
  ${sharedStyle}
`;

const ButtonAnchor = styled.a`
  ${sharedStyle}
`;

export default Button;
export { ButtonAnchor };
