import Link from "next/link";
import PropTypes from "prop-types";

// components
import Providers from "./layout/Providers";

// head metadata: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
    title: "Firtsname Lastname :: UCLAX Web 1",
};

const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Providers>
                    <main>
                        <nav className="sublinks">
                            <Link href="/">Home</Link>
                            <Link href="/about">About</Link>
                            <Link href="/not-found">Not Found</Link>
                        </nav>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;

// prop-types
RootLayout.propTypes = {
    children: PropTypes.any,
};
