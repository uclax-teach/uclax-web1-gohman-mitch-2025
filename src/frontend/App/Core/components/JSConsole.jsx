import { useState, useEffect } from "react";
// import { Hook, Unhook, Console } from "console-feed";

import styled from "styled-components";
import PropTypes from "prop-types";

const JSConsoleStyled = styled.div`
    background: #282c34;
    color: white;
    padding: 20px 5px;
    margin: 30px 0px;
`;

const JSConsole = ({ scriptFunction }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const originalConsole = { ...console };

        const patchedConsole = Object.keys(console).reduce((acc, method) => {
            acc[method] = (...args) => {
                setLogs((currLogs) => [...currLogs, { method, data: args }]);
                originalConsole[method](...args);
            };
            return acc;
        }, {});

        Object.assign(console, patchedConsole);

        return () => Object.assign(console, originalConsole); // Restore original
    }, []);

    useEffect(() => {
        scriptFunction();
    }, [scriptFunction]);

    return (
        <JSConsoleStyled>
            {logs.map((log, idx) => (
                <div key={idx}>
                    <strong>{log.method.toUpperCase()}:</strong>{" "}
                    {log.data.join(" ")}
                </div>
            ))}
        </JSConsoleStyled>
    );
};

export default JSConsole;

// prop-types
JSConsole.propTypes = {
    scriptFunction: PropTypes.func.isRequired,
};
