// hooks
import { useMediaQuery } from "@Theme/media/MediaQueryContext";

// components
import Small from "./Small";
import MediumLarge from "./MediumLarge";

const Header = () => {
    const { jsMedia } = useMediaQuery();
    return <header>{jsMedia.isSmall ? <Small /> : <MediumLarge />}</header>;
};

export default Header;
