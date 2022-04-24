import styled from "styled-components";

export const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(39, 51, 64);
  border: 1px solid #ababab;
  border-radius: 12px;

  input {
    padding: 5px 10px;
    border-radius: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.clr.textPrimary};
    font-size: 1.05rem;
  }
`;
