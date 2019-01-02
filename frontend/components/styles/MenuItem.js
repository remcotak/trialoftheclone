import styled, { css } from 'styled-components';

const sharedStyle = css`
  font-family: ${props => props.theme.fontHeading};
  padding: 1rem;

  &:active,
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MenuLink = styled.a`
  ${sharedStyle}
`;

const MenuButton = styled.button`
  ${sharedStyle}
  background: none;
  border: none;
  text-decoration: none;
  font-size: 1rem;
  color: ${props => props.theme.black};

  &:active,
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

export default MenuLink;
export { MenuButton };
