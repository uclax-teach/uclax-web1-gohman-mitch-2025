import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// useMediaQuery
import { MediaQueryProvider } from "@Theme/media/MediaQueryContext";

// Layout
import Layout from "./Layout/index";

// App Routes
import AppRoutes from "./Routes";

// component
const App = () => {
    return (
        <MediaQueryProvider>
            <BrowserRouter>
                <HelmetProvider>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </HelmetProvider>
            </BrowserRouter>
        </MediaQueryProvider>
    );
};

export default App;
