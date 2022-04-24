import React from "react";
import { StyledButton } from "./styled/Button.styled";

function Button({ text, onClick }) {
  return <StyledButton onClick={onClick || null}>{text}</StyledButton>;
}

export default Button;
