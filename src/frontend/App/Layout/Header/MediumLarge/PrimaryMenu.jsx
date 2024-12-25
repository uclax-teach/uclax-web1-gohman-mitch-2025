import styled from "styled-components";

// components
import SharedPrimaryMenu from "@App/Routes/PrimaryMenu";

//styles
const PrimaryMenuStyled = styled.div`
    text-align: center;
    margin-bottom: 20px;

    a {
        display: inline-block;
        width: 100px;
        margin: 0px 5px;
        line-height: 30px;
        color: ${({ theme }) => theme.colors.primary.light};
        border-bottom: solid 3px ${({ theme }) => theme.colors.primary.light};

        text-align: center;
        font-size: 12px;
        opacity: 0.8;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;

        &:hover,
        &:active,
        &:focus {
            opacity: 1;
        }

        &.active {
            color: ${({ theme }) => theme.colors.secondary.light};
            border-bottom-color: ${({ theme }) => theme.colors.secondary.light};
        }
    }
`;

// component
const PrimaryMenu = () => {
    return (
        <PrimaryMenuStyled>
            <SharedPrimaryMenu />
        </PrimaryMenuStyled>
    );
};

export default PrimaryMenu;
