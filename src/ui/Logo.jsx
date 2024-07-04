import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

const Text = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-grey-500);
    text-shadow: 0 0 10px var(--color-grey-400);
`;

function Logo() {
    return (
        <StyledLogo>
            <Text>Multi Tenant Web App</Text>
        </StyledLogo>
    );
}

export default Logo;
