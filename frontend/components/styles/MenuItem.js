import styled, { css } from 'styled-components';

const sharedStyle = css`
  font-family: ${props => props.theme.fontHeading};
  text-decoration: none;
  color: ${props => props.theme.black};
  padding: 1rem;

  &:active,
  &:hover {
    color: ${props => props.theme.primary};
    cursor: pointer;
  }
`;

const MenuLink = styled.a`
  ${sharedStyle}
`;

const MenuButton = styled.button`
  ${sharedStyle}
  background: none;
  border: none;
  font-size: 1rem;

  &:focus {
    outline: 0;
  }
`;

export default MenuLink;
export { MenuButton };
