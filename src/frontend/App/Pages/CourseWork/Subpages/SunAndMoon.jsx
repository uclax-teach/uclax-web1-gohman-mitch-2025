import styled from "styled-components";
import { useState } from "react";

// styles
const SunAndMoonStyled = styled.div`
    text-align: center;

    h2 {
        font-size: 30px;
        color: teal;
    }

    img {
        display: block;
        margin: 30px auto;
        padding: 20px;
        border: solid 20px teal;
        background-color: #004e4e;
    }
`;

// data
const sunSrc = "/assets/sunAndMoon/sun.png";
const moonSrc = "/assets/sunAndMoon/moon.png";

// component
const SunAndMoon = () => {
    // JS Layer
    const [imgSrc, imgSrcUpdate] = useState(moonSrc);

    const changeToSun = () => {
        imgSrcUpdate(sunSrc);
    };
    const changeToMoon = () => {
        imgSrcUpdate(moonSrc);
    };

    // HTML Layer
    return (
        <SunAndMoonStyled>
            <h2>SunAndMoon</h2>
            <img
                src={imgSrc}
                onMouseEnter={changeToSun}
                onMouseLeave={changeToMoon}
            />
        </SunAndMoonStyled>
    );
};

export default SunAndMoon;
