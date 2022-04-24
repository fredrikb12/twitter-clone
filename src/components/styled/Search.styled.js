import styled from "styled-components";
import Button from "../Button";

export const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(39, 51, 64);
  border: 1px solid #ababab;
  border-radius: 12px;
  position: relative;

  input {
    padding: 5px 10px;
    border-radius: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.clr.textPrimary};
    font-size: 1.05rem;
    width: 100%;
  }
`;

export const CloseSearchButton = styled(Button)`
  top: 0;
  right: 0;
  position: absolute;

  & div button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.9rem;
    color: green;
  }
`;
