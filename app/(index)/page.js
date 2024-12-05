// config
import { config } from "@/config";
const pageTitle = "Home";

// head metadata: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
    title: config.getPageTitle(pageTitle),
};

const Home = () => {
    return (
        <div>
            <h1>{pageTitle}</h1>
        </div>
    );
};

export default Home;
