import { useState, useEffect } from "react";
import styled from "styled-components";

// components
import Logo from "./Logo";
import PrimaryMenu from "./PrimaryMenu";
import Hamburger from "./Hamburger";

// styles
const SmallStyled = styled.div``;

const Small = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (showMenu) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [showMenu]);

    return (
        <SmallStyled>
            <Hamburger onClick={toggleMenu} />
            <Logo />
            {showMenu && <PrimaryMenu setShowMenu={setShowMenu} />}
        </SmallStyled>
    );
};

export default Small;
