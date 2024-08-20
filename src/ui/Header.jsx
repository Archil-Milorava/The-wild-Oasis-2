import styled from "styled-components";
import StyledHeaderMenu from "./StyledHeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  /* grid-column: 2 / 3;
  grid-row: 1 / 2; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <StyledHeaderMenu />
    </StyledHeader>
  );
}

export default Header;
