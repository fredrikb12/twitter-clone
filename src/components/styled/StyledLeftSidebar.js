import styled from "styled-components";

const StyledLeftSidebar = styled.header`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  padding: 0px 5px 50px;

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
    top: 0;
    height: 120px;
    flex-direction: row;
    z-index: 100;
    background-color: ${({ theme }) => theme.clr.background};
    border-bottom: 1px solid ${({ theme }) => theme.clr.buttonText};
    box-shadow: 0 2px 4px 5px rgba(0, 0, 0, 0.4);
    ul {
      display: flex;
    }
  }
`;

export default StyledLeftSidebar;
