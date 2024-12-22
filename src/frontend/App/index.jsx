import styled from "styled-components";
import { HelmetProvider } from "react-helmet-async";

// components
import Meta from "@Core/components/Meta";

//styles
const AppStyled = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    background: linear-gradient(to bottom, #007676, #004141);
    font-family: Arial, Helvetica, sans-serif;
    margin: auto;
    text-align: center;
    h1 {
        font-size: 50px;
    }
`;

// component
const App = () => {
    const pageTitle = `UCLAX Web 1: ${
        import.meta.env.VITE_APP_CONFIG_STUDENT_NAME
    }`;
    return (
        <HelmetProvider>
            <AppStyled>
                <Meta pageTitle={pageTitle} />
                <h1>{pageTitle}</h1>
            </AppStyled>
        </HelmetProvider>
    );
};

export default App;
