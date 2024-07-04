import styled, { css } from "styled-components";

const Heading = styled.h1`
    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 2.5rem;
            font-weight: 700;
        `}
    ${(props) =>
        props.as === "h2" &&
        css`
            font-size: 2rem;
            font-weight: 700;
        `}
    ${(props) =>
        props.as === "h3" &&
        css`
            font-size: 1.8rem;
            font-weight: 600;
        `}
    ${(props) =>
        props.as === "h4" &&
        css`
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
        `}
    line-height: 1.5;
`;

export default Heading;
