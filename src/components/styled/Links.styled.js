import { Link } from "react-router-dom";
import styled from "styled-components";

const UnstyledLink = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

const BaseLink = styled(UnstyledLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.clr.textPrimary};
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(BaseLink)``;

export const SecondaryLink = styled(BaseLink)`
  color: ${({ theme }) => theme.clr.textSecondary};
`;
