// styles
import { theme } from "../../theme";

// Evaluate screen
export const evalScreen = () => {
    return {
        isSmall: window.matchMedia(
            `(max-width: ${theme.breakpoints.medium - 1}px)`
        ).matches,
        isMediumAndUp: window.matchMedia(
            `(min-width: ${theme.breakpoints.medium}px)`
        ).matches,
        isMedium: window.matchMedia(
            `(min-width: ${theme.breakpoints.medium}px) and (max-width: ${
                theme.breakpoints.large - 1
            }px)`
        ).matches,
        isLarge: window.matchMedia(`(min-width: ${theme.breakpoints.large}px)`)
            .matches,
    };
};
