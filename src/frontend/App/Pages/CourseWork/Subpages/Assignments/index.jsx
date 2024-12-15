// components
import AssignmentTemplate from "./AssignmentTemplate";

// assignments
import assign1 from "./markdown/assignment1.md?raw";
import assign2 from "./markdown/assignment2.md?raw";

const Assignments = () => {
    return (
        <div>
            <h2>Assignments</h2>
            <AssignmentTemplate markdown={assign1} />
            <AssignmentTemplate markdown={assign2} />
        </div>
    );
};

export default Assignments;
