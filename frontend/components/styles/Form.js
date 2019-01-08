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

const Form = styled.form`
  position: relative;
  box-shadow: ${props => props.theme.bs};
  padding: ${props => props.theme.spacingBase};
  font-size: 1rem;

  fieldset {
    border: none;

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: ${props => props.theme.secondary};
    }

    &[disabled] {
      opacity: 0.5;
    }

    &[aria-busy='true']::before {
      animation: ${loading} 1s linear infinite;
    }
  }

  label {
    display: block;
    font-weight: 700;
  }

  input,
  textarea,
  select {
    width: 100%;
    font-size: 1rem;
    font-family: ${props => props.theme.fontRegular};
    border: 0;
    border-bottom: 2px solid ${props => props.theme.black};
    padding: ${props => props.theme.spacingSmall} 0
      ${props => props.theme.spacingTiny};
    margin-bottom: ${props => props.theme.spacingBase};

    &:focus {
      outline: 0;
      border-color: ${props => props.theme.primary};
    }
  }

  .form__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: ${props => props.theme.spacingBase};
  }

  .form__actions {
    margin-top: ${props => props.theme.spacingBase};
  }
`;

export default Form;
