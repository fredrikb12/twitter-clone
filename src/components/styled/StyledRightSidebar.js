import styled from "styled-components";

const StyledRightSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 100px;
  background-color: palevioletred;

  @media (max-width: 1250px) {
    display: none;
  }
`;

export default StyledRightSidebar;
