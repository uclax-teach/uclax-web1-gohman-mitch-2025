import styled, { css } from "styled-components";

//styles
const MessageStyled = styled.div`
    margin: 20px 0px;
    padding: 20px;
    font-size: 18px;
    ${({ $isSuccess, theme }) => {
        if ($isSuccess) {
            return css`
                color: ${theme.colors.messaging.success.color};
                background-color: ${theme.colors.messaging.success.bgColor};
            `;
        } else {
            return css`
                color: ${theme.colors.messaging.success.color};
                background-color: ${theme.colors.messaging.error.bgColor};
            `;
        }
    }}
`;

// component
const Message = ({ formStatus }) => {
    const {
        message: { isSuccess, text },
    } = formStatus;

    if (!text) return null;

    return <MessageStyled $isSuccess={isSuccess}>{text}</MessageStyled>;
};

export default Message;

import PropTypes from "prop-types";

// prop-types
Message.propTypes = {
    formStatus: PropTypes.object.isRequired,
};
