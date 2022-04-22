import { Link } from "react-router-dom";
import styled from "styled-components";

const UnstyledLink = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

export const StyledLink = styled(UnstyledLink)`
  text-decoration: none;
  color: ${(props) => (props.textColor ? props.textColor : "white")};
`;
