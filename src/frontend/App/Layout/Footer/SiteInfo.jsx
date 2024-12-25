import styled from "styled-components";

//styles
const SiteInfoStyled = styled.h2`
    margin: 5px 0px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary.light};
`;

// component
const SiteInfo = () => {
    const {
        VITE_APP_CONFIG_STUDENT_NAME,
        VITE_APP_CONFIG_TITLE,
        VITE_APP_CONFIG_LOCATION,
        VITE_APP_CONFIG_TAGLINE,
    } = import.meta.env;

    return (
        <SiteInfoStyled>
            {VITE_APP_CONFIG_STUDENT_NAME} :: {VITE_APP_CONFIG_TITLE} ::{" "}
            {VITE_APP_CONFIG_TAGLINE} :: {VITE_APP_CONFIG_LOCATION}
        </SiteInfoStyled>
    );
};

export default SiteInfo;
