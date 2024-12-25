import styled from "styled-components";

//styles
const CopyrightStyled = styled.div`
    font-size: 14px;
`;
// component
const Copyright = () => {
    return (
        <CopyrightStyled>
            &copy; {new Date().getFullYear()}. All rights reserved.
        </CopyrightStyled>
    );
};

export default Copyright;
