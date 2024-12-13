import { theme } from "../theme";

export const cssMedia = {
    isSmall: `@media (max-width: ${theme.breakpoints.medium - 1}px)`,
    isMediumAndUp: `@media (min-width: ${theme.breakpoints.medium}px)`,
    isMedium: `@media (min-width: ${
        theme.breakpoints.medium
    }px) and @media (max-width: ${theme.breakpoints.large - 1}px)`,
    isLarge: `@media (min-width: ${theme.breakpoints.large}px)`,
};
