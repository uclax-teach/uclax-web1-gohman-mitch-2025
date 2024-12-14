import Essay from "./Essay.jsx";
import Essay1 from "./Essay1.md?raw";

const Essays = () => {
    return (
        <div>
            <h2>Essays</h2>
            <Essay markdown={Essay1} />
        </div>
    );
};

export default Essays;
