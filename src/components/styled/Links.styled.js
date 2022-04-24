import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.clr.textPrimary};
  &:hover {
    text-decoration: underline;
  }
`;

export const SecondaryLink = styled(StyledLink)`
  color: ${({ theme }) => theme.clr.textSecondary};
`;
