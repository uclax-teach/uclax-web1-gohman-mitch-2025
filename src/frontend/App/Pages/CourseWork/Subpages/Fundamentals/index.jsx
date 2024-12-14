// components
import JSConsole from "@CoreComponents/JSConsole";

// scripts
import { decFunctions } from "./scripts/0.Functions/A.Declared";
import { commentsLogs } from "./scripts/1.Basics/A.Comments-Logs";

const Fundamentals = () => {
    return (
        <div>
            <h2>JS Fundamentals</h2>

            <h3>Functions</h3>
            <JSConsole script={decFunctions} />

            <h3>Comments and Logs</h3>
            <JSConsole script={commentsLogs} />
        </div>
    );
};

export default Fundamentals;