import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu2 = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function StyledHeaderMenu() {



  return (
    <StyledHeaderMenu2>
    
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu2>
  );
}

export default StyledHeaderMenu;
