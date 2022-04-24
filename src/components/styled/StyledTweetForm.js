import styled from "styled-components";

const StyledTweetForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding-top: 10px;
  position: relative;

  & button {
    position: absolute;
    right: 10px;
    bottom: 0px;
    max-width: 90px;
    align-self: flex-end;
  }

  @media (max-width: 650px) {
    & button {
      position: static;
    }
  }
`;

export default StyledTweetForm;
