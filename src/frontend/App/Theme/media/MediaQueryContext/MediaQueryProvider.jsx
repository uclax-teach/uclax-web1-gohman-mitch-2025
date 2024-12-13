import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

// context
import { MediaQueryContext } from "./MediaQueryContext";

// styles
import { evalScreen } from "./evalScreen";

export const MediaQueryProvider = ({ children }) => {
    const [jsMedia, setJsMedia] = useState(evalScreen);

    useEffect(() => {
        const evaluateMedia = () => {
            setJsMedia(evalScreen());
        };

        // Evaluate on load
        evaluateMedia();

        // Listen and evaluate on resize
        window.addEventListener("resize", evaluateMedia);
        return () => {
            // Remove listener on dismount
            window.removeEventListener("resize", evaluateMedia);
        };
    }, []);

    // useMemo so it does not pass value on every render
    const value = useMemo(() => ({ jsMedia }), [jsMedia]);

    return (
        <MediaQueryContext.Provider value={value}>
            {children}
        </MediaQueryContext.Provider>
    );
};

// prop-types
MediaQueryProvider.propTypes = {
    children: PropTypes.any,
};
