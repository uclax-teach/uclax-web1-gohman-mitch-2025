// components
import JSConsole from "@Core/components/JSConsole";

// scripts
import { decFunctions } from "./scripts/0.Functions/A.Declared";
import { commentsLogs } from "./scripts/1.Basics/A.Comments-Logs";

const Fundamentals = () => {
    return (
        <div>
            <h2>JS Fundamentals</h2>

            <h3>Functions</h3>
            <JSConsole scriptFunction={decFunctions} />

            <h3>Comments and Logs</h3>
            <JSConsole scriptFunction={commentsLogs} />
        </div>
    );
};

export default Fundamentals;
