import { StyledButton, StyledDeleteButton } from "./styled/Button.styled";

function Button({ text, onClick, children, type, style }) {
  return (
    <StyledButton style={style || null} type={type} onClick={onClick || null}>
      {text || children || null}
    </StyledButton>
  );
}
export function DeleteButton({ text, onClick, children, type, style }) {
  return (
    <StyledDeleteButton
      style={style || null}
      type={type}
      onClick={onClick || null}
    >
      {text || children || null}
    </StyledDeleteButton>
  );
}

export default Button;
