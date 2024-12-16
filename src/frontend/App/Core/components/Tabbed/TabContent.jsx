import styled from "styled-components";
import PropTypes from "prop-types";

// styles
const TabContentStyled = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.primary.default};

    @media ${({ theme }) => theme.cssMedia.isMediumAndUp} {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
    }

    img {
        max-width: 100%;
        display: block;
        margin: 0px auto 15px;
    }

    h3 {
        font-size: 30px;
        color: ${({ theme }) => theme.colors.secondary.light};
    }

    p {
        font-size: 18px;
        color: ${({ theme }) => theme.colors.primary.light};
        margin-bottom: 20px;
        line-height: 150%;
    }
`;

const TabContent = ({ curTab }) => {
    const { title, src, text } = curTab;

    return (
        <TabContentStyled>
            <div className="column1">
                <img src={src} alt={title} />
            </div>
            <div className="column2">
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </TabContentStyled>
    );
};

export default TabContent;

// prop-types
TabContent.propTypes = {
    curTab: PropTypes.object.isRequired,
};
