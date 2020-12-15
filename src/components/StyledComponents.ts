import styled from "styled-components/macro";

type ButtonContainerProps = {
  correct?: boolean;
  clicked?: boolean;
};

export const ButtonContainer = styled.div<ButtonContainerProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  :focus {
    outline: none;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 55%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, clicked }) =>
      correct
        ? "linear-gradient(90deg, #27fc8a, #0fa553)"
        : !correct && clicked
        ? "linear-gradient(90deg, #ff0000, #990808)"
        : "linear-gradient(90deg, #04034b, #022e47)"};
    border: none;
    outline: none;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    color: #faf3db;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    &:focus: {
      outline: none;
      border: none;
    }
  }
`;
