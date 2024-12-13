// hooks
import { useMediaQuery } from "@Theme/media";

// components
import Small from "./Small";
import MediumLarge from "./MediumLarge";

const Header = () => {
    const { jsMedia } = useMediaQuery();

    console.log({ jsMedia });

    return <header>{jsMedia.isSmall ? <Small /> : <MediumLarge />}</header>;
};

export default Header;
