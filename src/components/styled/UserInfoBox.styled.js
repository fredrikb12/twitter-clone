import styled from "styled-components";

export const UserInfoBox = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  p {
    font-size: 1.4rem;
  }

  a {
    text-decoration: none;
    border-radius: 30px;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 5px 10px;
  }

  a:hover {
    background-color: #233648;
  }
`;
