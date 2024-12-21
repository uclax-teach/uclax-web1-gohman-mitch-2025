const breakpoints = {
    medium: 800,
    large: 1200,
};

export const theme = {
    cssMedia: {
        isSmall: `(max-width: ${breakpoints.medium - 1}px)`,
        isMediumAndUp: `(min-width: ${breakpoints.medium}px)`,
        isMedium: `(min-width: ${breakpoints.medium}px) and (max-width: ${
            breakpoints.large - 1
        }px)`,
        isLarge: `(min-width: ${breakpoints.large}px)`,
    },
    fonts: {
        default: "'Helvetica Neue', sans-serif",
        roboto: '"Roboto", sans-serif',
    },
    fontWeights: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900,
    },
    colors: {
        primary: {
            default: "#014444",
            light: "#7ccdcd",
            dark: "#012626",
        },
        secondary: {
            default: "#eee",
            light: "#fff",
            dark: "#999",
        },
        messaging: {
            success: { color: "#000", bgColor: "#b2ecb2" },
            error: { color: "#000", bgColor: "#f5672a" },
        },
    },
};
