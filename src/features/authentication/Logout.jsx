import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";

import { IoLogOutOutline } from "react-icons/io5";
import ButtonIcon from "../../ui/ButtonIcon";

function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login");
  }

  return (
    <ButtonIcon onClick={handleLogout} variation="danger" >
      <IoLogOutOutline />
    </ButtonIcon>
  );
}

export default Logout;
