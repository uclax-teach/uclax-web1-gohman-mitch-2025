import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ${({ theme: { fonts, fontWeights, colors } }) => {
        return css`
            html,
            body {
                margin: 0;
                font-family: ${fonts.roboto};
                font-weight: ${fontWeights.regular};
            }
            body {
                overflow-y: scroll;
                background-color: ${colors.primary.default};
                color: ${colors.secondary.light};
                min-width: 300px;
                font-size: 16px;
                line-height: 1.5;
            }

            body.modal-open {
                position: fixed;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                z-index: 1;
            }

            main {
                background-color: ${colors.secondary.default};
                color: ${colors.secondary.dark};
                padding: 50px 0px 100px;
                min-height: 800px;
            }

            * {
                box-sizing: border-box;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-weight: ${fontWeights.bold};
                margin: 0px 0px 14px;
                color: ${colors.primary.default};
            }
            p {
                font-weight: ${fontWeights.regular};
                margin: 0px 0px 28px;
                font-size: 16px;
            }

            li {
                font-size: 14px;
                margin-bottom: 5px;
                p {
                    margin-bottom: 5px;
                }
            }

            h1,
            h2 {
                font-weight: 700;
            }
            h3,
            h4 {
                font-weight: 500;
            }
            h5,
            h6 {
                font-weight: 400;
            }

            h1 {
                font-size: 50px;
            }
            h2 {
                font-size: 40px;
            }
            h3 {
                font-size: 30px;
            }
            h4 {
                font-size: 25px;
            }
            h5 {
                font-size: 20px;
            }
            h6 {
                font-size: 18px;
            }

            table {
                border: solid 1px ${colors.primary.light};
                border-collapse: collapse;
                width: 100%;
                margin: 20px 0px;

                th,
                td {
                    border: solid 1px ${colors.primary.light};
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
                clip: rect(0, 0, 0, 0);
                border: 0;
            }

            nav {
                ul {
                    padding: 0px;
                    margin: 0px;

                    li {
                        display: inline-block;
                        list-style-type: none;
                        margin: 0px;
                    }
                }
            }

            nav.content {
                margin: 30px 0px;

                a {
                    display: inline-block;
                    margin-right: 5px;
                    line-height: 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    color: ${colors.primary.default};
                    background-color: ${colors.secondary.light};
                    border-bottom: solid 3px transparent;

                    &:hover {
                        border-bottom-color: ${colors.primary.default};
                        &.active {
                            border-bottom-color: transparent;
                        }
                    }

                    &.active {
                        color: ${colors.secondary.light};
                        background-color: ${colors.primary.default};
                    }
                }
            }
        `;
    }}

`;

export default GlobalStyle;
