import styled from "styled-components";

const PreloaderStyled = styled.div`
    padding: 50px 10px;
    text-align: center;

    img {
        width: 100%;
        max-width: 300px;
    }
`;

const Preloader = () => {
    return (
        <PreloaderStyled>
            <img src="/assets/spinner-rainbow.svg" alt="preloader" />
        </PreloaderStyled>
    );
};

export default Preloader;
