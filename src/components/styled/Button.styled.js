import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 8px 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.clr.buttonDarkBg};
  color: ${({ theme }) => theme.clr.buttonText};
  border: none;
  font-size: 1.05rem;

  &:hover {
    cursor: pointer;
    background-color: #35618d;
  }
`;
