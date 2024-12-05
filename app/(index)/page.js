const pageTitle = "Home";

// head metadata: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
    title: `${pageTitle} :: Firtsname Lastname :: UCLAX Web 1`,
};

const Home = () => {
    return (
        <div>
            <h1>{pageTitle} v3</h1>
        </div>
    );
};

export default Home;
