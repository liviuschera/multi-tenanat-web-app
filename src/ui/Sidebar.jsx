import styled from "styled-components";
import CompanySelection from "../features/CompanySelection";
import Logo from "./Logo";
import isUserLoggedIn from "../utils/isUserLoggedIn";

const StyledSidebar = styled.aside`
    grid-row: 1/-1;
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    background-color: var(--color-grey-100);
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            {isUserLoggedIn() ? (
                <CompanySelection />
            ) : (
                <span>
                    Please log in to be able to see the company selection
                </span>
            )}
        </StyledSidebar>
    );
}

export default Sidebar;
