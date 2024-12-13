// components
import PrimaryNav from "../PrimaryNav";
import Hamburger from "./Hamburger";

const Small = () => {
    const toggleMenu = (e) => {
        console.log({ toggleMenu: true });
    };

    return (
        <div>
            Small
            <Hamburger onClick={toggleMenu} />
            <PrimaryNav />
        </div>
    );
};

export default Small;
