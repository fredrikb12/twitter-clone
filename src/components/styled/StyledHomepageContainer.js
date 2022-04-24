import styled from "styled-components";
import StyledFlexRowContainer from "./StyledFlexRowContainer";

const StyledHomepageContainer = styled(StyledFlexRowContainer)`
  justify-content: center;
  gap: 20px;
  flex: 1;
  color: ${({ theme }) => theme.clr.textPrimary};
`;

export default StyledHomepageContainer;
