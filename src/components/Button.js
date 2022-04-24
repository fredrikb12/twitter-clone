import React from "react";
import { StyledButton } from "./styled/Button.styled";

function Button({ text, onClick, children, type, style }) {
  return (
    <StyledButton style={style || null} type={type} onClick={onClick || null}>
      {text || children || null}
    </StyledButton>
  );
}

export default Button;
