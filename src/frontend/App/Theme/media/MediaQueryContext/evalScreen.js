// styles
import { theme } from "../../theme";

// Evaluate screen
export const evalScreen = () => {
    let jsMedia = {};

    Object.entries(theme.cssMedia).forEach(([key, value]) => {
        jsMedia[key] = window.matchMedia(value).matches;
    });

    return jsMedia;
};
