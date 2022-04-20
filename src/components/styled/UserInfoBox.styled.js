import styled from "styled-components";

export const UserInfoBox = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  p {
    font-size: 1.4rem;
  }

  div:first-child {
    display: flex;
    gap: 8px;
    align-items: center;

    a {
      text-decoration: none;
    }
  }
`;
