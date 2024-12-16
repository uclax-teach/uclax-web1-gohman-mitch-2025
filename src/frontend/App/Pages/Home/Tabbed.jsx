import { useState, useEffect } from "react";
import styled from "styled-components";

// api
import axios from "@Core/axios";

// components
import CoreTabbed from "@Core/components/Tabbed/index";
import Preloader from "@Core/components/Preloader";

// styles
const TabbedStyled = styled.div`
    margin: 50px 0px 0px;
`;

const Tabbed = () => {
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        const fetchTabs = async () => {
            const resp = await axios.get(`/tabs`);
            setTabs(resp.data);
        };
        fetchTabs();
    }, []);

    if (tabs.length === 0) return <Preloader />;

    return (
        <TabbedStyled>
            <CoreTabbed tabs={tabs} />
        </TabbedStyled>
    );
};

export default Tabbed;
