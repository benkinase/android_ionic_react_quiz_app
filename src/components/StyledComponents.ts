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
    width: 50%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, clicked }) =>
      correct
        ? "linear-gradient(90deg, #33f88f, #0fa553)"
        : !correct && clicked
        ? "linear-gradient(90deg, #ff2424, #a04141)"
        : "linear-gradient(90deg, #065475, #0a4f9e)"};
    border: 3px solid #e6e9ee;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
