import styled from "styled-components";

const StyledLeftSidebar = styled.header`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  padding: 20px 5px 50px;

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

  @media (max-width: 840px) {
    li p {
      display: none;
    }
  }

  @media (max-width: 550px) {
    height: 120px;
    flex-direction: row;

    ul {
      display: flex;
    }
  }
`;

export default StyledLeftSidebar;
