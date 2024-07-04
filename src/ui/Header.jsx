import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import isUserLoggedIn from "../utils/isUserLoggedIn";
// import Tooltip from "./Tooltip";

const StyledHeader = styled.header`
    background-color: var(--color-grey-100);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-200);
    display: flex;
    justify-content: end;
    align-items: center;
`;

function Header() {
    return (
        <StyledHeader>
            {isUserLoggedIn() ? <Logout /> : <span>Logged out</span>}
        </StyledHeader>
    );
}

export default Header;
