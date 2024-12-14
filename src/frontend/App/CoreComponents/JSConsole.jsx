import { useState, useEffect } from "react";
import { Hook, Unhook, Console } from "console-feed";

import styled from "styled-components";
import PropTypes from "prop-types";

const JSConsoleStyled = styled.div`
    background: #282c34;
    color: white;
    padding: 20px 5px;
    margin: 30px 0px;
`;

const JSConsole = ({ script }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        Hook(
            window.console,
            (log) => setLogs((currLogs) => [...currLogs, log]),
            false
        );
        return () => Unhook(window.console);
    }, []);

    useEffect(() => {
        // Execute the external script
        script();
    }, []); // Trigger only on mount

    return (
        <JSConsoleStyled>
            <Console logs={logs} variant="dark" />
        </JSConsoleStyled>
    );
};

export default JSConsole;

// prop-types
JSConsole.propTypes = {
    script: PropTypes.func.isRequired,
};
