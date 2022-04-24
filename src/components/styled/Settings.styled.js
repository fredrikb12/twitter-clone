import styled from "styled-components";

export const StyledSettings = styled.form`
  margin-top: 30px;
  padding: 50px;
  border: 1px solid #ababab;
  & label {
    display: grid;
    grid-template-columns: 150px 1fr;
    column-gap: 20px;
    justify-items: flex-start;
  }

  & div {
    margin-bottom: 20px;
  }

  & input,
  & textarea {
    padding: 10px;
    outline: none;
    border: 1px solid #cdcdcd;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  & textarea {
    resize: vertical;
  }
`;
