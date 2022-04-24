import { Link } from "react-router-dom";
import styled from "styled-components";

const UnstyledLink = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

export const StyledLink = styled(UnstyledLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.clr.textPrimary};
`;

export const SecondaryLink = styled(UnstyledLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.clr.textSecondary};
`;
