import { useContext } from "react";

// context
import { MediaQueryContext } from "./MediaQueryContext";

// 6. This is what is used in the children to access our media queries
export const useMediaQuery = () => {
    return useContext(MediaQueryContext);
};
