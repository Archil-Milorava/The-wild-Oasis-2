import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu2 = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function StyledHeaderMenu() {
  const navigate = useNavigate();



  return (
    <StyledHeaderMenu2>
      <li>
        <ButtonIcon onClick={() => navigate("/account")} >
          <CiUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu2>
  );
}

export default StyledHeaderMenu;
