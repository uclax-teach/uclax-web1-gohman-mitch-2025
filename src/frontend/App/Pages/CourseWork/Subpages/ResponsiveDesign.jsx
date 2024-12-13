import styled from "styled-components";

import { cssMedia, useMediaQuery } from "@Theme/media/index.js";

const ResponsiveDesignStyled = styled.div`
    background-color: orange;

    ${cssMedia.isMediumAndUp} {
        background-color: pink;
    }
`;

const ResponsiveDesign = () => {
    const { jsMedia } = useMediaQuery();

    // console.log({ jsMedia });

    return (
        <ResponsiveDesignStyled>
            <h2>Responsive Design</h2>
        </ResponsiveDesignStyled>
    );
};

export default ResponsiveDesign;
