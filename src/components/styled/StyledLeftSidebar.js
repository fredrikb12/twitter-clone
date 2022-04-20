import styled from "styled-components";

const StyledLeftSidebar = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 350px;
  min-height: 100px;
  padding: 20px;

  ul {
    padding: 0;
  }

  li {
    padding: 10px 0;
  }

  li > a {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 70px;
    font-size: 1.3rem;
    color: white;
    border-radius: 25px;
    padding: 5px 10px;
  }

  p {
    color: white;
  }

  li > a:hover {
    background-color: #233648;
  }

  @media (max-width: 950px) {
    li p {
      display: none;
    }
  }
`;

export default StyledLeftSidebar;
