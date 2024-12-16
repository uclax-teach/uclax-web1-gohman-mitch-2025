import { useState } from "react";
import PropTypes from "prop-types";

// components
import TabContent from "./TabContent";
import TabList from "./TabList";

const Tabbed = ({ tabs }) => {
    const [curTab, curTabUpdate] = useState(tabs[0]);

    return (
        <div>
            <TabList tabs={tabs} curTab={curTab} curTabUpdate={curTabUpdate} />
            <TabContent curTab={curTab} />
        </div>
    );
};

export default Tabbed;

// prop-types
Tabbed.propTypes = {
    tabs: PropTypes.array.isRequired,
};
