import styled from "styled-components";

import { cssMedia, useMediaQuery } from "/App/Layout/Theme/media/index.js";

const ResponsiveDesignStyled = styled.div`
    background-color: orange;

    ${cssMedia.isMediumAndUp} {
        background-color: pink;
    }
`;

const ResponsiveDesign = () => {
    const { jsMedia } = useMediaQuery();

    // console.log({ jsMedia });

    return <ResponsiveDesignStyled>ResponsiveDesign</ResponsiveDesignStyled>;
};

export default ResponsiveDesign;
