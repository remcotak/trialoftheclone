import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    width: 100%;
    left: 0;
  }

  25% {
    width: 0%;
    left: 100%;
  }

  50% {
    width: 0%;
    left: 0;
  }

  100% {
    width: 100%;
    right: 0;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: '';
    display: ${props => (props.loading ? 'block' : 'none')};
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.secondary};
    animation: ${loading} 1s linear infinite;
  }

  input {
    position: relative;
    width: 100%;
    font-size: 1rem;
    font-family: ${props => props.theme.fontRegular};
    border: 0;
    border-bottom: 2px solid ${props => props.theme.black};
    padding: ${props => props.theme.spacingSmall} 0
      ${props => props.theme.spacingTiny};

    &:focus {
      outline: 0;
      border-color: ${props => props.theme.primary};
    }
  }

  @media screen and (min-width: ${props => props.theme.lap}) {
    width: 50%;
  }

  @media screen and (min-width: ${props => props.theme.desk}) {
    width: 40%;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 2px solid ${props => props.theme.black};
  border-top: none;
  background-color: ${props => props.theme.white};
`;

const SearchResult = styled.div`
  color: ${props =>
    props.highlighted ? props.theme.primary : props.theme.black};
  padding: ${props => props.theme.spacingSmall};

  &::before {
    content: '👉';
    display: ${props => (props.highlighted ? 'inline-block' : 'none')};
    margin-right: ${props => props.theme.spacingSmall};
  }

  &:not(:last-child) {
    border-bottom: 2px dashed ${props => props.theme.black};
  }
`;

export { SearchStyles, SearchResults, SearchResult };
