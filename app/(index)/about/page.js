const pageTitle = "About";

// head metadata: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
    title: `${pageTitle} :: Firtsname Lastname :: UCLAX Web 1`,
};

const About = () => {
    return (
        <div>
            <h1>{pageTitle}</h1>
        </div>
    );
};

export default About;
