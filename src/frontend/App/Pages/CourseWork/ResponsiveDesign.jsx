import styled from "styled-components";

import { useMediaQuery } from "@Theme/media/MediaQueryContext";

const ResponsiveDesignStyled = styled.div`
    @media ${({ theme }) => theme.cssMedia.isMediumAndUp} {
        .image-wrapper {
            display: flex;
            justify-content: space-between;
        }
    }
    img {
        display: block;
        width: 100%;
        padding: 30px;
        margin-bottom: 20px;
        background-color: crimson;
        border-radius: 10px;
        &:last-child {
            border-radius: 50%;
        }
    }

    @media ${({ theme }) => theme.cssMedia.isMediumAndUp} {
        img {
            background-color: gold;
            max-width: 240px;
        }
    }
    @media ${({ theme }) => theme.cssMedia.isLarge} {
        img {
            background-color: magenta;
            max-width: 350px;
        }
    }
`;

const ResponsiveDesign = () => {
    const { jsMedia } = useMediaQuery();

    return (
        <ResponsiveDesignStyled>
            <h2>Responsive Design</h2>

            <div className="image-wrapper">
                {jsMedia.isMediumAndUp && (
                    <img src="/assets/responsive/gold.jpg" alt="gold" />
                )}
                <img src="/assets/responsive/purple.jpg" alt="purple" />
                <img src="/assets/responsive/teal.jpg" alt="teal" />
            </div>
        </ResponsiveDesignStyled>
    );
};

export default ResponsiveDesign;
