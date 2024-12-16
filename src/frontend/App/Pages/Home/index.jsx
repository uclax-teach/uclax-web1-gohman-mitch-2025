import styled from "styled-components";

// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";
import Tabbed from "./Tabbed";
import Slideshow from "./Slideshow";

const HomeStyled = styled.div`
    h1 {
        display: none;
    }
`;

const Home = () => {
    return (
        <HomeStyled>
            <Meta />
            <h1>Home</h1>
            <Slideshow />
            <Inset>
                <Tabbed />
            </Inset>
        </HomeStyled>
    );
};

export default Home;
