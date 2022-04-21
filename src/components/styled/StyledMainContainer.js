import styled from "styled-components";

const borderColor = "#7d8c9b";

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 600px;
  color: #f9f9f9;

  & > div {
    border: 1px solid ${borderColor};
    border-bottom: none;
    padding: 10px;
  }

  & > div:first-child {
    border-top: none;
  }

  & > div:last-child {
    border-bottom: 1px solid ${borderColor};
  }
`;

export default StyledMainContainer;
