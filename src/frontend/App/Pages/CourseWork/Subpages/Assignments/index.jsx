// components
import Single from "./Single.jsx";

// assignments
import Assign1 from "./markdown/Assign1.md?raw";
import Assign2 from "./markdown/Assign2.md?raw";

const assignments = [
    { number: 1, title: "Assignment 1: Why is water wet?", markdown: Assign1 },
    {
        number: 2,
        title: "Assignment 2: How deep is the ocean?",
        markdown: Assign2,
    },
];

const Assignments = () => {
    return (
        <div>
            <h2>Assignments</h2>
            <ol>
                {assignments.map(({ number, title }) => {
                    return (
                        <li key={number}>
                            <a href={`#assignmentId-${number}`}>{title}</a>
                        </li>
                    );
                })}
            </ol>

            {assignments.map(({ number, title, markdown }) => {
                return (
                    <Single
                        key={number}
                        number={number}
                        title={title}
                        markdown={markdown}
                    />
                );
            })}
        </div>
    );
};

export default Assignments;
