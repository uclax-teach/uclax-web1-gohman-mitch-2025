// components
import Meta from "@Core/components/Meta";
import Inset from "@Layout/Inset";
import Tabbed from "./Tabbed";

const Home = () => {
    return (
        <Inset>
            <Meta />
            <h1>Home</h1>

            <Tabbed />
        </Inset>
    );
};

export default Home;
