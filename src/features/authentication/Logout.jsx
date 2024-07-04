import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

function Logout() {
    function logout() {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <ButtonIcon onClick={() => logout()}>
            <HiArrowRightOnRectangle />
        </ButtonIcon>
    );
}

export default Logout;
