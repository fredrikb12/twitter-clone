import styled from "styled-components";

const StyledRightSidebar = styled.aside`
  position: sticky;
  top: 50px;
  display: flex;
  flex-direction: column;
  width: 350px;
  min-height: 100px;

  @media (max-width: 1250px) {
    display: none;
  }
`;

export default StyledRightSidebar;
