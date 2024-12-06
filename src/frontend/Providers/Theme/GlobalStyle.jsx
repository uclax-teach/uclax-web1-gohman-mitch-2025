import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: ${(props) => props.theme.fonts.roboto};
        font-weight: ${(props) => props.theme.fontWeights.regular};
    }
    body {
        overflow-y: scroll;
        background-color: ${(props) => props.theme.colors.primary.default};
        min-width: 300px;
    }

    body.modal-open {
        position: fixed;
        top: 0px; right: 0px; bottom: 0px; left: 0px;
        z-index: 1;
    }

    main {
        padding: 30px;
        background-color: ${(props) => props.theme.colors.secondary.default};
    }

    * {
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: ${(props) => props.theme.fontWeights.bold};
        margin: 0px 0px 15px;
        color: ${(props) => props.theme.colors.primary.default};
    }
    p {
        font-weight: ${(props) => props.theme.fontWeights.regular};
        margin: 0px 0px 15px;
        font-size: 14px;
    }

    li {
        font-size: 14px;
        margin-bottom: 5px;
        p {
            margin-bottom: 5px;
        }
    }

    h1, h2 { font-weight: 700; }
    h3, h4 { font-weight: 500; }
    h5, h6 { font-weight: 400; }

    h1 { font-size: 50px; }
    h2 { font-size: 40px; }
    h3 { font-size: 30px; }
    h4 { font-size: 25px; }
    h5 { font-size: 20px; }
    h6 { font-size: 18px; }

    table {
        border: solid 1px ${(props) => props.theme.colors.primary.light};;
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0px;

        th, td {
            border: solid 1px ${(props) => props.theme.colors.primary.light};
            padding: 5px;
            vertical-align: top;
        }
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }

    nav.sublinks {
        margin: 30px 0px;

        a {
            display: inline-block;
            margin-right: 5px;
            line-height: 20px;
            text-decoration: none;
            border-radius: 5px;
            padding: 10px 20px;
            color: white;
            background-color: ${(props) => props.theme.colors.primary.default};
        }

        a:hover,
        a.active {
            background-color: ${(props) => props.theme.colors.primary.dark};
        }
    }


`;

export default GlobalStyle;