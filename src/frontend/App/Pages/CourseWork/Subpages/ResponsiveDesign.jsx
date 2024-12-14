import styled from "styled-components";

import { useMediaQuery } from "@Theme/media/MediaQueryContext";

const ResponsiveDesignStyled = styled.div`
    background-color: orange;

    @media ${({ theme }) => theme.cssMedia.isMediumAndUp} {
        background-color: pink;
    }
`;

const ResponsiveDesign = () => {
    const { jsMedia } = useMediaQuery();

    return (
        <ResponsiveDesignStyled>
            <h2>Responsive Design</h2>
        </ResponsiveDesignStyled>
    );
};

export default ResponsiveDesign;
