import Link from "next/link";
import Theme from "./layout/Theme";
import PropTypes from "prop-types";

const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Theme>
                    <main>
                        <nav className="sublinks">
                            <Link href="/">Home</Link>
                            <Link href="/about">About</Link>
                            <Link href="/not-found">Not Found</Link>
                        </nav>
                        {children}
                    </main>
                </Theme>
            </body>
        </html>
    );
};

export default RootLayout;

// prop-types
RootLayout.propTypes = {
    children: PropTypes.any,
};
