import { config } from "@/config";
const pageTitle = "Not Found";

// head metadata: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
    title: config.getPageTitle(pageTitle),
};

const NotFound = () => {
    return (
        <div>
            <h1>Oops! Not Found</h1>
            <p>We were unable to find the page you requested.</p>
        </div>
    );
};

export default NotFound;
